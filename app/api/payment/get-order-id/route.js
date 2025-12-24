import { zSchmea } from "../../../../lib/zodSchema";
import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import Razorpay from "razorpay";

export async function POST(request) {
  try {
    await connectDb();
    const payload = await request?.json();
    const schema = zSchmea.pick({
      amount: true,
    });
    const validate = schema.safeParse(payload);
    if (!validate?.success) {
      return responce(false, 400, "invalid or missing fields", validate.error);
    }
    const { amount } = validate?.data;
    var razInstance = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const razOptions = {
      amount: Number(amount) * 100,
      currency: "INR",
    };
    const orderDetails = await razInstance?.orders?.create(razOptions);
    const orderId = orderDetails.id;
    return responce(true, 200, "Order Id Generated", orderId);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
