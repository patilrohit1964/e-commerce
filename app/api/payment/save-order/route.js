import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import z from "zod";
import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import { zSchmea } from "../../../../lib/zodSchema";
import OrderModal from "../../../../model/order.model";
import { sendMail } from "../../../../lib/sendMail";
import { orderNotificationEmail } from "../../../../email/orderNotification";

export async function POST(request) {
  try {
    await connectDb();
    const payload = await request?.json();
    const productSchema = z.object({
      productId: z.string().length(24, "invalid product id format"),
      variantId: z.string().length(24, "invalid variant id format"),
      name: z.string().min(1, "invalid name"),
      quantity: z.number().nonnegative(),
      mrp: z.number().nonnegative(),
      sellingPrice: z.number().nonnegative(),
    });
    const orderSchema = zSchmea
      .pick({
        name: true,
        email: true,
        country: true,
        state: true,
        city: true,
        pincode: true,
        landmark: true,
        ordernote: true,
      })
      .extend({
        userId: z.string().optional(),
        razorpay_payment_id: z.string().min(3, "payment id is required"),
        razorpay_order_id: z.string().min(3, "order id is required"),
        razorpay_signature: z.string().min(3, "signature id is required"),
        total: z.number().nonnegative(),
        discount: z.number().nonnegative(),
        couponDiscountAmount: z.number().nonnegative(),
        totalAmount: z.number().nonnegative(),
        products: z.array(productSchema),
      });
    const validate = orderSchema?.safeParse(payload);
    if (!validate?.success) {
      return responce(false, 400, "invalid or missing fields", validate?.error);
    }
    const validatedData = validate?.data;
    // payment verification
    const verification = validatePaymentVerification(
      {
        order_id: validatedData?.razorpay_order_id,
        payment_id: validatedData?.razorpay_payment_id,
      },
      validatedData?.razorpay_signature,
      process.env.RAZORPAY_KEY_SECRET
    );
    let paymentVerification = false;
    if (verification) {
      paymentVerification = true;
    }
    const newOrder = await OrderModal.create({
      user: validatedData?.userId,
      name: validatedData?.name,
      email: validatedData?.email,
      phone: validatedData?.phone,
      country: validatedData?.country,
      state: validatedData?.state,
      city: validatedData?.city,
      pincode: validatedData?.pincode,
      landmark: validatedData?.landmark,
      orderNote: validatedData?.ordernote,
      products: validatedData?.products,
      subTotal: validatedData?.total,
      discount: validatedData?.discount,
      couponDiscountAmount: validatedData?.couponDiscountAmount,
      totalAmount: validatedData?.totalAmount,
      payment_id: validatedData?.razorpay_payment_id,
      order_id: validatedData?.razorpay_order_id,
      status: paymentVerification ? "pending" : "unverified",
    });
    try {
      const orderMailData = {
        name: validatedData?.name,
        orderId: validatedData?.razorpay_order_id,
        products: validatedData?.products,
        totalAmount: validatedData?.totalAmount,
        shippingAddress: validatedData?.landmark,
        orderDate: new Date().getDate(),
        status: newOrder?.status,
        orderDetailsUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/order-details/${validatedData?.razorpay_order_id}`,
      };
      await sendMail(
        "Order Placed Successfully",
        validatedData?.email,
        orderNotificationEmail(orderMailData)
      );
      return responce(true, 200, "Order Placed Successfully");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
