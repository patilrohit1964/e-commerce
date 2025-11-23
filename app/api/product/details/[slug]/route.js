import connectDb from "../../../../../lib/dbConnect";
import { catchError, responce } from "../../../../../lib/helper";
import ProductModel from "../../../../../model/product.model";
import MediaModel from "../../../../../model/media.model";
import ProductVariantModal from "../../../../../model/productVariant.model";
import REVIEWModel from "../../../../../model/review.model";

export async function GET(request, { params }) {
  try {
    await connectDb();
    // get slug from param
    const { slug } = await params;
    const searchParams = request?.nextUrl?.searchParams;
    const size = searchParams?.get("size");
    const color = searchParams?.get("color");

    const filter = {
      deletedAt: null,
    };

    if (!slug) {
      return responce(false, 404, `Product Not Found for ${slug}`);
    }

    filter.slug = slug;

    // get product
    const getProduct = await ProductModel?.findOne(filter)
      .populate("medias", "secure_url")
      .lean();

    if (!getProduct) {
      return responce(false, 404, "Product Not Found");
    }

    // get product variant
    const variantFilter = {
      productId: getProduct?._id,
    };
    if (size) {
      variantFilter.size = size;
    }
    if (color) {
      variantFilter.color = color;
    }

    const variant = await ProductVariantModal.findOne(variantFilter)
      .populate("medias", "secure_url")
      .lean();

    if (!variant) {
      return responce(false, 404, "Product Varaint Not Found");
    }

    // get color and size
    const getColor = await ProductVariantModal.distinct("color", {
      productId: getProduct?._id,
    });

    const getSize = await ProductVariantModal.aggregate([
      { $match: { productId: getProduct?._id } },
      { $sort: { _id: 1 } },
      {
        $group: {
          _id: "$size",
          first: { $first: "$_id" },
        },
      },
      {
        $sort: { first: 1 },
      },
      { $project: { _id: 0, size: "$_id" } },
    ]);
    // get review
    const review = await REVIEWModel.countDocuments({
      product: getProduct?._id,
    });
    const productData = {
      productData: getProduct,
      productVariants: variant,
      productColors: getColor,
      productSizes: getSize ? getSize?.map((item) => item.size) : [],
      productReviews: review,
    };
    return responce(true, 200, "Product Details Found", productData);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
