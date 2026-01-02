import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";
import OrderModal from "../../../../model/order.model";

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

    const getOrders = await OrderModal.find(filter)
      .select("-products")
      .sort({ createdAt: -1 })
      .lean();
    if (!getOrders) {
      return responce(false, 400, "collection empty");
    }
    return responce(true, 200, "data found", getOrders);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
