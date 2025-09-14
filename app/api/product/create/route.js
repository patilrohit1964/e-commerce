import connectDb from "../../../../lib/dbConnect";
import { responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";
import { zSchmea } from "../../../../lib/zodSchema";
import ProductModal from "../../../../model/product.model";
export async function POST(req) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return responce(false, 403, "unauthorized");
    }
    await connectDb();
    const payload = await req.json();
    const formSchema = zSchmea.pick({
      //we can get that method from zoSchema and use here as schema
      name: true,
      slug: true,
      mrp: true,
      category: true,
      sellingPrice: true,
      discription: true,
      discountPercentage: true,
      medias: true,
    });
    const validate = formSchema.safeParse(payload);
    console.log('validate',payload);
    if (!validate.success) {
      return responce(false, 400, "invalid or missing fields", validate.error);
    }
    const newProduct = new ProductModal({
      name: validate.data.name,
      slug: validate.data.slug,
      mrp: validate.data.mrp,
      category: validate.data.category,
      sellingPrice: validate.data.sellingPrice,
      discription: validate.data.discription,
      discountPercentage: validate.data.discountPercentage,
      medias: validate.data.medias,
    });
    await newProduct.save();
    return responce(true, 200, "product added successfully");
  } catch (error) {
    console.log(error);
  }
}
