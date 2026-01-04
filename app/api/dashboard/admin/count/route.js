import { responce } from "../../../../../lib/helper";
import { isAuthenticated } from "../../../../../lib/isAuth";
import CategoryModel from "../../../../../model/category.model";
import ProductModel from "../../../../../model/product.model";
import User from "../../../../../model/user.model";
import OrderModel from "../../../../../model/order.model";
import connectDb from "../../../../../lib/dbConnect";

export async function GET() {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return responce(false, 403, "Unauthorized");
    }
    await connectDb();
    const [category, product, customer, order] = await Promise.all([
      CategoryModel.countDocuments({ deletedAt: null }),
      ProductModel.countDocuments({ deletedAt: null }),
      User.countDocuments({ deletedAt: null }),
      OrderModel.countDocuments({ deletedAt: null }),
    ]);
    return responce(true, 200, "Dashboard count.", {
      category,
      product,
      customer,
      order,
    });
  } catch (error) {
    console.log(error);
  }
}
