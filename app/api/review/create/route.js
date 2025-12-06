import { isAuthenticated } from "../../../../lib/isAuth";
import connectDb from "../../../../lib/dbConnect";
import { responce } from "../../../../lib/helper";
import { zSchmea } from "../../../../lib/zodSchema";
import ReviewModel from "../../../../model/review.model";
export async function POST(req) {
  try {
    const auth = await isAuthenticated("user");
    if (!auth.isAuth) {
      return responce(false, 403, "unauthorized");
    } //check here function throw error
    await connectDb();
    const payload = await req.json();
    const schema = zSchmea.pick({
      productId: true,
      userId: true,
      rating: true,
      title: true,
      review: true,
    });
    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return responce(false, 400, "invalid or missing fields", validate.error);
    }
    const newReview = new ReviewModel({
      product: validate?.data?.productId,
      user: validate?.data?.userId,
      rating: validate?.data?.rating,
      review: validate?.data?.review,
      title: validate?.data?.title,
    });
    await newReview.save();
    return responce(true, 200, "Your review submitted successfully");
  } catch (error) {
    console.log(error);
  }
}
