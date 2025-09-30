import connectDb from "../../../../lib/dbConnect";
import { responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";
import { zSchmea } from "../../../../lib/zodSchema";
import ProductModel from "../../../../model/product.model";
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
      mrp: true,
      category: true,
      sellingPrice: true,
      discription: true,
      discountPercentage: true,
      medias: true,
    });
    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return responce(false, 400, "invalid or missing fields", validate.error);
    }
    const updatedProduct = await ProductModel.findOne({
      deletedAt: null,
      _id: validate?.data?._id,
    });
    updatedProduct.name = validate?.data?.name;
    updatedProduct.slug = validate?.data?.slug;
    updatedProduct.category = validate?.data?.category;
    updatedProduct.discountPercentage = validate?.data?.discountPercentage;
    updatedProduct.mrp = validate?.data?.mrp;
    updatedProduct.sellingPrice = validate?.data?.sellingPrice;
    await updatedProduct.save();
    return responce(true, 200, "category update successfully");
  } catch (error) {
    console.log(error);
  }
}
// addes some comment for git check