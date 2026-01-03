import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";
import OrderModal from "../../../../model/order.model";

export async function PUT(req) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return responce(false, 403, "unauthorized");
    }
    await connectDb();
    const { _id, status } = await req.json();
    if (!_id || !status) {
      return responce(false, 400, "order id and status are required");
    }
    const statusUpdate = await OrderModal.findById(_id);
    if (!statusUpdate) {
      return responce(false, 400, "order data not found");
    }
    statusUpdate.status = status;
    await statusUpdate.save();
    return responce(true, 200, "status updated",statusUpdate);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
