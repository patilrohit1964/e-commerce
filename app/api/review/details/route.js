import mongoose from "mongoose";
import connectDb from "../../../../lib/dbConnect";
import { responce } from "../../../../lib/helper";
import REVIEWModel from "../../../../model/review.model";

export async function GET(request) {
  try {
    await connectDb();
    const searchParams = request?.nextUrl?.searchParams;
    const productId = searchParams?.get("productId");
    if (!productId) {
      return responce(false, 404, "Product id is not found");
    }
    const reviews = await REVIEWModel.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(productId),
          deletedAt: null,
        },
      },
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    console.log("reviews", reviews);
    return responce(true, 200, "Review Details Found", reviews);
    return "hii";
  } catch (error) {
    console.log(error);
  }
}
