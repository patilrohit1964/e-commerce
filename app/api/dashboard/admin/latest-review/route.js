import connectDb from "../../../../../lib/dbConnect";
import { catchError, responce } from "../../../../../lib/helper";
import { isAuthenticated } from "../../../../../lib/isAuth";
import REVIEWModel from "../../../../../model/review.model";

export async function GET() {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return responce(false, 403, "Unauthorized");
    }
    await connectDb();
    const latestReview = await REVIEWModel.find({ deletedAt: null })
      .sort({
        createdAt: 1,
      })
      .populate({
        path: "product",
        select: "name medias",
        populate: {
          path: "medias",
          select: "secure_url",
        },
      })
      .lean();
    return responce(true, 200, "latest orders", latestReview);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
