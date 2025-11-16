import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import CategoryModel from "../../../../model/category.model";

export async function GET() {
  try {
    await connectDb();
    const getCategory = await CategoryModel.find({ deletedAt: null }).lean();
    if (!getCategory) {
      return responce(false, 404, "category not found");
    }
    return responce(true, 200, "category found.", getCategory);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
