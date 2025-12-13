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
    // total review
    const totalReview = reviews?.reduce((sum, r) => sum + r.count, 0);
    // average review
    const averageRating =
      totalReview > 0
        ? (reviews?.reduce((sum, r) => sum + r?._id * r.count, 0) / totalReview).toFixed(1)
        : "0.0";

    const rating = reviews.reduce((acc, r) => {
      acc[r?._id] = r?.count;
      return acc;
    }, {});
    const percentage = reviews.reduce((acc, r) => {
      acc[r?._id] = (r?.count / totalReview) * 100;
      return acc;
    }, {});

    return responce(true, 200, "Review Details Found", {
      reviews,
      totalReview,
      rating,
      percentage,
      averageRating,
    });
  } catch (error) {
    console.log(error);
  }
}
