import connectDb from "../../../../lib/dbConnect";
import { responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";
import { zSchmea } from "../../../../lib/zodSchema";
import ProductVariantModel from "../../../../model/productVariant.model";
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
      productId: true,
      color: true,
      size: true,
      sku: true,
      mrp: true,
      sellingPrice: true,
      discountPercentage: true,
      medias: true,
    });
    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return responce(false, 400, "invalid or missing fields", validate.error);
    }
    const updatedProduct = await ProductVariantModel.findOne({
      deletedAt: null,
      _id: validate?.data?._id,
    });

    if (!updatedProduct) {
      return responce(false, 400, "product not found", updatedProduct);
    }

    updatedProduct.productId = validate?.data?.productId;
    updatedProduct.color = validate?.data?.color;
    updatedProduct.size = validate?.data?.size;
    updatedProduct.sku = validate?.data?.sku;
    updatedProduct.mrp = validate?.data?.mrp;
    updatedProduct.sellingPrice = validate?.data?.sellingPrice;
    updatedProduct.discountPercentage = validate?.data?.discountPercentage;
    updatedProduct.medias = validate?.data?.medias;
    await updatedProduct.save();
    return responce(true, 200, "product variant update successfully");
  } catch (error) {
    console.log(error);
  }
}
