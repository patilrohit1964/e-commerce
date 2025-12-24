import { zSchmea } from "../../../../lib/zodSchema";
import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import z from "zod";

export async function POST(request) {
  try {
    await connectDb();
    const payload = await request?.json();
    const productSchema = z.object({
      productId: z.string().length(24, "invalid product id format"),
      variantId: z.string().length(24, "invalid variant id format"),
      name: z.string().length(1, "invalid name"),
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
        products:z.array()
      });
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
