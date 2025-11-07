import connectDb from "../../../lib/dbConnect";
import { catchError, responce } from "../../../lib/helper";
import ProductModel from "../../../model/product.model";

export async function GET() {
  try {
    await connectDb();
    const getProduct = await ProductModel.find({
      deletedAt: null,
    })
      .populate("medias")
      .limit(8)
      .lean();
    if (!getProduct) {
      return responce(false, 404, "Product not found");
    }
    return responce(true, 200, "Product found.", getProduct);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
