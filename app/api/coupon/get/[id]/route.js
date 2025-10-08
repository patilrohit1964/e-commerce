import { isValidObjectId } from "mongoose";
import connectDb from "../../../../../lib/dbConnect";
import { catchError, responce } from "../../../../../lib/helper";
import { isAuthenticated } from "../../../../../lib/isAuth";
import CouponModal from "../../../../../model/coupon.model";

export async function GET(request, { params }) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return responce(false, 401, "unauthorized");
    }
    await connectDb();
    const getParams = await params;
    const id = getParams?.id;
    const filter = {
      deletedAt: null,
    };
    if (!isValidObjectId(id)) {
      return responce(false, 400, "invalid object id");
    }
    filter._id = id;
    const getCoupon = await CouponModal.findOne(filter).lean();
    if (!getCoupon) {
      return responce(false, 404, "Coupon not found");
    }
    return responce(true, 200, "Coupon found.", getCoupon);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
