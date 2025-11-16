import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import ProductVariantModel from "../../../../model/productVariant.model";

export async function GET() {
  try {
    await connectDb();
    const getColor = await ProductVariantModel.distinct("color").lean();
    // this distinct method help for unique if data 2ble found then this return only one
    if (!getColor) {
      return responce(false, 404, "color not found");
    }
    return responce(true, 200, "color found.", getColor);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
