import connectDb from "../../../../lib/dbConnect";
import { responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";
import { zSchmea } from "../../../../lib/zodSchema";
import CouponModal from "../../../../model/coupon.model";
export async function POST(req) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return responce(false, 403, "unauthorized");
    }
    await connectDb();
    const payload = await req.json();
    const formSchema = zSchmea.pick({
      //we can get that method from zoSchema and use here as schema
      code: true,
      validity: true,
      minShoppingAmount: true,
      discountPercentage: true,
    });
    const validate = formSchema.safeParse(payload);
    if (!validate.success) {
      return responce(false, 400, "invalid or missing fields", validate.error);
    }
    const newCoupon = new CouponModal({
      code: validate?.data?.code,
      validity: validate?.data?.validity,
      minShoppingAmount: validate?.data?.minShoppingAmount,
      discountPercentage: validate?.data?.discountPercentage,
    });
    await newCoupon.save();
    return responce(true, 200, "Coupon added successfully");
  } catch (error) {
    console.log(error);
  }
}
