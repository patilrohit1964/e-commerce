import ProductVariantModal from "../../../model/productVariant.model";
import ProductModal from "../../../model/product.model";
import MediaModal from "../../../model/media.model";
import connectDb from "../../../lib/dbConnect";
import { catchError, responce } from "../../../lib/helper";

export async function POST(request) {
  try {
    await connectDb();
    const payload = await request?.json();
    const verifiedCartData = await Promise.all(
      payload?.map(async (cartItem) => {
        const variant = await ProductVariantModal.findById(cartItem?.variantId)
          .populate("productId")
          .populate("medias", "secure_url")
          .lean();
        if (variant) {
          return {
            productId: variant?.product?._id,
            variantId: variant?._id,
            name: variant?.product?.name,
            url: variant?.product?.slug,
            size: variant?.size,
            color: variant?.color,
            mrp: variant?.mrp,
            sellingPrice: variant?.sellingPrice,
            media: variant?.medias[0]?.secure_url,
            quantity: cartItem?.quantity,
          };
        }
      })
    );
    return responce(true, 200, "verified cart data", verifiedCartData);
  } catch (error) {
    return catchError(error);
  }
}
