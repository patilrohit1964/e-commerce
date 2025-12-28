import { responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";
import OrderModal from "../../../../model/order.model";
export async function GET() {
  try {
    const auth = await isAuthenticated("user");
    if (!auth?.isAuth) {
      return responce(false, 401, "Unauthorized");
    }
    const userId = auth.userId;
    // get current orders
    const recentOrders = await OrderModal.find({ user: userId })
      .populate("products.productId", "name slug")
      .populate({
        path: "products.variantId",
        populate: { path: "medias", select: "secure_url" },
      })
      .limit(10)
      .lean();
    //   get order count
    const totalOrder = await OrderModal.countDocuments({ user: userId });
    return responce(true, 200, "Dashboard Info", { recentOrders, totalOrder });
  } catch (error) {
    console.log(error);
  }
}
