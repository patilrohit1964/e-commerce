import connectDb from "../../../../../lib/dbConnect";
import { catchError, responce } from "../../../../../lib/helper";
import { isAuthenticated } from "../../../../../lib/isAuth";
import OrderModal from "../../../../../model/order.model";

export async function GET() {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return responce(false, 403, "Unauthorized");
    }
    await connectDb();
    const latestOrder = await OrderModal.find({ deletedAt: null })
      .sort({
        createdAt: 1,
      })
      .limit(20)
      .lean();
    return responce(true, 200, "latest orders", latestOrder);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
