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
    const monthlySales = await OrderModal.aggregate([
      {
        $match: {
          deletedAt: null,
          status: { $in: ["processing", "shipped", "delivered"] },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalSales: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
    return responce(true, 200, "data count message", monthlySales);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
