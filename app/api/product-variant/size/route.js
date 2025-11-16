import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import ProductVariantModel from "../../../../model/productVariant.model";

export async function GET() {
  try {
    await connectDb();
    const getSize = await ProductVariantModel.aggregate([
      { $sort: { _id: 1 } },
      {
        $group: {
          _id: "$size",
          first: { $first: "$_id" },
        },
      },
      {
        $sort: { first: 1 },
      },
      { $project: { _id: 0, size: "$_id" } },
    ]);
    // this distinct method help for unique if data 2ble found then this return only one
    if (!getSize?.length) {
      return responce(false, 404, "size not found");
    }
    const sizes = getSize?.map((el) => el?.size);
    return responce(true, 200, "size found.", sizes);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
