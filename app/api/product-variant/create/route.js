import connectDb from "../../../../lib/dbConnect";
import { responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";
import { zSchmea } from "../../../../lib/zodSchema";
import ProductVariantModal from "../../../../model/productVariant.model";
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
      productId: true,
      sku: true,
      size: true,
      color: true,
      discountPercentage: true,
      sellingPrice: true,
      mrp: true,
      medias: true,
    });
    const validate = formSchema.safeParse(payload);
    if (!validate.success) {
      return responce(false, 400, "invalid or missing fields", validate.error);
    }
    const newProductVariant = new ProductVariantModal({
      productId: validate.data.productId,
      sku: validate.data.sku,
      size: validate.data.size,
      color: validate.data.color,
      discountPercentage: validate.data.discountPercentage,
      sellingPrice: validate.data.sellingPrice,
      mrp: validate.data.mrp,
      medias: validate.data.medias,
    });
    await newProductVariant.save();
    return responce(true, 200, "product variant added successfully");
  } catch (error) {
    console.log(error);
  }
}
