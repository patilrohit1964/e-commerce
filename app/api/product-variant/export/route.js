import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";
import ProductVariantModel from "../../../../model/productVariant.model";

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

    const getProduct = await ProductVariantModel.find(filter)
      .select("-medias")
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
