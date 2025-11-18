import { NextResponse } from "next/server";
import connectDb from "../../../lib/dbConnect";
import { responce } from "../../../lib/helper";
import { isAuthenticated } from "../../../lib/isAuth";
import REVIEWModel from "../../../model/review.model";
import CategoryModel from "@/model/category.model";
import ProductModel from "@/model/product.model";
export async function GET(request) {
  try {
    await connectDb();
    const searchParams = request?.nextUrl?.searchParams;
    // get filters from query params
    const size = searchParams?.get("size");
    const color = searchParams?.get("color");
    const minPrice = parseInt(searchParams?.get("minPrice"));
    const maxPrice = parseInt(searchParams?.get("maxPrice"));
    const categorySlug = searchParams?.get("category");
    const search = searchParams?.get("q");
    // pagination
    const limit = parseInt(searchParams?.get("limit")) || 9;
    const page = parseInt(searchParams?.get("page")) || 0;
    const pageMultiLimit = page * limit;

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
      { $limit: limit + 1 },{
        // here inc get data
      }
    ]);
  } catch (error) {
    console.log(error);
  }
}
