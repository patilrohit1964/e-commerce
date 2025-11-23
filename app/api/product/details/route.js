import connectDb from "../../../../../lib/dbConnect";
import { catchError, responce } from "../../../../../lib/helper";
import ProductModel from "../../../../model/product.model";
import MediaModel from "../../../../model/media.model";
import ProductVariantModal from "../../../..productVariant.model";
import REVIEWModel from "@/model/review.model";

export async function GET(request, { params }) {
  try {
    await connectDb();
    // get slug from param
    const { slug } = await params;
    console.log("slug", slug);
    const searchParams = request.nextUrl.nextParams;
    const size = searchParams.get("size");
    const color = searchParams.get("color");

    const filter = {
      deletedAt: null,
    };

    if (!slug) {
      return responce(false, 404, "Product Not Found");
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
      product: getProduct?._id,
    };
    if (size) {
      variantFilter.size = size;
    }
    if (color) {
      variantFilter.color = color;
    }

    const variant = await ProductVariantModal.findOne(variantFilter)
      .populate("media", "secure_url")
      .lean();
    if (!variant) {
      return responce(false, 404, "Product Not Found");
    }

    // get color and size
    const getColor = await ProductVariantModal.distinct("color", {
      product: getProduct?._id,
    });

    const getSize = await ProductVariantModel.aggregate([
      { $match: { product: getProduct?._id } },
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
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
