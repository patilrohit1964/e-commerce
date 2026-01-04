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
    const orderStatus = await OrderModal.aggregate([
      {
        $match: {
          deletedAt: null,
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: 1,
        },
      },
    ]);
    return responce(true, 200, "data status count message", orderStatus);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
