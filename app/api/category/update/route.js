import connectDb from "@/lib/dbConnect";
import { responce } from "@/lib/helper";
import { isAuthenticated } from "@/lib/isAuth";
import { zSchmea } from "@/lib/zodSchema";
import CategoryModel from "@/model/category.model";
export async function PUT(req) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return responce(false, 403, "unauthorized");
    }
    await connectDb();
    const payload = await req.json();
    const schema = zSchmea.pick({
      _id: true,
      name: true,
      slug: true,
    });
    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return responce(false, 400, "invalid or missing fields", validate.error);
    }
    const newCategory = new CategoryModel.findOne({
      deletedAt: null,
      _id: validate?.data?._id,
    });
    await newCategory.save();
    return responce(true, 200, "category update successfully");
  } catch (error) {
    console.log(error);
  }
}
