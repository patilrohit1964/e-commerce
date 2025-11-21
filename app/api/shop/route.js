import connectDb from "../../../lib/dbConnect";
import { responce } from "../../../lib/helper";
import CategoryModel from "../../../model/category.model";
import ProductModel from "../../../model/product.model";
export async function GET(request) {
  try {
    await connectDb();
    const searchParams = request?.nextUrl?.searchParams;
    // get filters from query params
    const size = searchParams?.get("size");
    const color = searchParams?.get("color");
    const minPrice = parseInt(searchParams?.get("minPrice")) || 0;
    const maxPrice = parseInt(searchParams?.get("maxPrice")) || 0;
    const categorySlug = searchParams?.get("category");
    const search = searchParams?.get("q");
    // pagination
    const limit = parseInt(searchParams?.get("limit")) || 9;
    const page = parseInt(searchParams?.get("page")) || 0;
    const skip = page * limit;
    // sorting
    const sortOptions = searchParams?.get("sort") || "default_sorting";
    let sortQuery = {};
    if (sortOptions === "default_sorting") sortQuery = { createdAt: -1 };
    if (sortOptions === "asc") sortQuery = { name: 1 };
    if (sortOptions === "desc") sortQuery = { name: -1 };
    if (sortOptions === "price_low_high") sortQuery = { sellingPrice: 1 };
    if (sortOptions === "price_high_low") sortQuery = { sellingPrice: -1 };
    // find category by slug
    let categoryId = null;
    if (categorySlug) {
      const categoryData = await CategoryModel.findOne({
        deletedAt: null,
        slug: categorySlug,
      })
        .select("_id")
        .lean();
      if (categoryData) categoryId = categoryData?._id;
    }
    // match stage
    let matchStage = {};
    if (categoryId) matchStage.category = categoryId; //filter by category
    if (search) {
      matchStage.name = { $regex: search, $options: "i" };
    }
    // aggregation pipeline
    const products = await ProductModel.aggregate([
      { $match: matchStage },
      { $sort: sortQuery },
      { $skip: skip },
      { $limit: limit + 1 },
      {
        $lookup: {
          from: "productvariants",
          localField: "_id",
          foreignField: "product",
          as: "variants",
        },
      },
      {
        $addFields: {
          variants: {
            $filter: {
              input: "$variants",
              as: "variant",
              cond: {
                $and: [
                  size ? { $eq: ["$$variant.size", size] } : { $literal: true }, // literal use for bypass,
                  color
                    ? { $eq: ["$$variant.color", color] }
                    : { $literal: true }, // literal use for bypass,
                  { $gte: ["$$variant.sellingPrice", minPrice] }, // literal use for bypass,
                  { $lte: ["$$variant.sellingPrice", maxPrice] }, // literal use for bypass,
                ],
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "medias",
          localField: "medias",
          foreignField: "_id",
          as: "medias",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          mrp: 1,
          sellingPrice: 1,
          discountPercentage: 1,
          medias: {
            _id: 1,
            secure_url: 1,
            alt: 1,
          },
          variants: {
            color: 1,
            size: 1,
            mrp: 1,
            sellingPrice: 1,
            discountPercentage: 1,
            // our filterin and data not working currectly so work on this aggrgation 
          },
        },
      },
    ]);

    let nextPage = null;
    if (products.length > limit) {
      nextPage = page + 1;
      products.pop(); //remove xtra items
    }
    return responce(true, 200, "Product date found", { products, nextPage });
  } catch (error) {
    console.log(error);
  }
}
