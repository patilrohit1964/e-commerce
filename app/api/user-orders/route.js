import { responce } from "../../../lib/helper";
import { isAuthenticated } from "../../../lib/isAuth";
import OrderModal from "../../../model/order.model";

export async function GET() {
  try {
    const auth = await isAuthenticated("user");
    if (!auth?.isAuth) {
      return responce(false, 401, "Unauthorized");
    }
    const userId = auth.userId;
    // get current orders
    const orders = await OrderModal.find({ user: userId })
      .populate("products.productId", "name slug")
      .populate({
        path: "products.variantId",
        populate: { path: "medias", select: "secure_url" },
      })
      .lean();
    return responce(true, 200, "Order Info", orders);
  } catch (error) {
    console.log(error);
  }
}
