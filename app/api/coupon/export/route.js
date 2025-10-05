import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";
import CouponModal from "../../../../model/coupon.model";

export async function GET(request, { params }) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return responce(false, 401, "unauthorized");
    }
    await connectDb();

    const filter = {
      deletedAt: null,
    };

    const getProduct = await CouponModal.find(filter)
      .seelct("-medias -description -_id")
      .sort({ createdAt: -1 })
      .lean();
    if (!getProduct) {
      return responce(false, 400, "collection empty");
    }
    return responce(true, 200, "data found", getProduct);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
