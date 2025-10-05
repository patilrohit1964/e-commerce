import { isValidObjectId } from "mongoose";
import connectDb from "../../../../../lib/dbConnect";
import { catchError, responce } from "../../../../../lib/helper";
import { isAuthenticated } from "../../../../../lib/isAuth";
import ProductModelVariant from "../../../../../model/productVariant.model";

export async function GET(request, { params }) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return responce(false, 401, "unauthorized");
    }
    await connectDb();
    const getParams = await params;
    const id = getParams?.id;
    const filter = {
      deletedAt: null,
    };
    if (!isValidObjectId(id)) {
      return responce(false, 400, "invalid object id");
    }
    filter._id = id;
    const getProductVariant = await ProductModelVariant.findOne(filter)
      .populate(
        "medias",
        "_id secure_url" //remember when populate then in path same that schema field in our case:ex productId
      )
      .lean();
    if (!getProductVariant) {
      return responce(false, 404, "Product Variant not found");
    }
    return responce(true, 200, "Product Varinat found.", getProductVariant);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
