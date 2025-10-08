import connectDb from "../../../../lib/dbConnect";
import { responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";
import { zSchmea } from "../../../../lib/zodSchema";
import CouponModal from "../../../../model/coupon.model";
export async function PUT(req) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return responce(false, 403, "unauthorized");
    }
    await connectDb();
    const payload = await req.json();
    const schema = zSchmea.pick({
      _id: true,
      code: true,
      validity: true,
      minShoppingAmount: true,
      discountPercentage: true,
    });
    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return responce(false, 400, "invalid or missing fields", validate.error);
    }
    const updatedCoupon = await CouponModal.findOne({
      deletedAt: null,
      _id: validate?.data?._id,
    });

    if (!updatedCoupon) {
      return responce(false, 400, "product not found", updatedCoupon);
    }
    updatedCoupon.code = validate?.data?.code;
    updatedCoupon.minShoppingAmount = validate?.data?.minShoppingAmount;
    updatedCoupon.validity = validate?.data?.validity;
    updatedCoupon.discountPercentage = validate?.data?.discountPercentage;
    await updatedCoupon.save();
    return responce(true, 200, "coupon update successfully");
  } catch (error) {
    console.log(error);
  }
}
