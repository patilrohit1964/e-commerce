import mongoose, { isValidObjectId, Mongoose } from "mongoose";
import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";
import REVIEWModel from "../../../../model/review.model";

export async function GET(request) {
  try {
    await connectDb();
    const searchParams = await request?.nextUrl?.searchParams;
    const productId = searchParams?.get("productId");
    const page = parseInt(searchParams?.get("page")) || 0;
    const limit = 10;
    const skip = page * limit;
    let matchQuery = {
      deletedAt: null,
      product: new mongoose.Types.ObjectId(productId),
    };

    // aggregation
    const aggregation = [
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $unwind: { path: "$userData", preserveNullAndEmptyArrays: true },
      },
      {
        $match: matchQuery,
      },
      {
        $sort: { createdAt: -1 },
      },
      { $limit: limit + 1 },
      {
        $project: {
          _id: 1,
          reviewdBy: "$userData.name",
          avatar: "$userData.avatar",
          rating: 1,
          title: 1,
          review: 1,
          createdAt: 1,
        },
      },
    ];
    const reviews = await REVIEWModel.aggregate(aggregation);
    const totalReview = await REVIEWModel.countDocuments(matchQuery);
    // check if more data exists
    let nextPage = null;
    if (reviews?.length > limit) {
      nextPage = page + 1;
      reviews.pop();
    }
    return responce(true, 200, "reviews found.", {
      reviews,
      nextPage,
      totalReview,
    });
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
