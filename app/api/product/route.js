import { NextResponse } from "next/server";
import connectDb from "../../../lib/dbConnect";
import { responce } from "../../../lib/helper";
import { isAuthenticated } from "../../../lib/isAuth";
import ProductModel from "../../../model/product.model";

export async function GET(req) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return responce(false, 403, "unauthorized");
    }
    await connectDb();
    const searchParams = req.nextUrl.searchParams;
    // extract query parameters
    const start = parseInt(searchParams.get("start") || 0, 10);
    const size = parseInt(searchParams.get("size") || 10, 10);
    const filters = JSON.parse(searchParams.get("filters") || "[]");
    const sorting = JSON.parse(searchParams.get("sorting") || "[]");
    const globalFilter = searchParams.get("globalFilter") || "";
    const deleteType = searchParams.get("deleteType");
    // build match query
    let matchQuries = {};
    if (deleteType === "SD") {
      matchQuries = { deletedAt: null };
    } else if (deleteType === "PD") {
      matchQuries = { deletedAt: { $ne: null } };
    }
    // global search
    if (globalFilter) {
      matchQuries["$or"] = [
        { name: { $regex: globalFilter, $options: "i" } },
        { slug: { $regex: globalFilter, $options: "i" } },
        { "categoryData.name": { $regex: globalFilter, $options: "i" } },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$mrp" },
              regex: globalFilter,
              options: "i",
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$sellingPrice" },
              regex: globalFilter,
              options: "i",
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$discountPercentage" },
              regex: globalFilter,
              options: "i",
            },
          },
        },
      ];
    }

    // column filter
    filters?.forEach((fil) => {
      matchQuries[fil?.id] = { $regex: fil?.value, $options: "i" };
    });
    // sorting
    let sortQuery = {};
    sorting?.forEach((sort) => {
      sortQuery[sort?.id] = sort?.desc ? -1 : 1;
    });

    // aggregate pipeline
    const aggregatePipeline = [
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: {
          path: "$categoryData",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $match: matchQuries },
      { $sort: Object.keys(sortQuery)?.length ? sortQuery : { createdAt: -1 } },
      { $skip: start },
      { $limit: size },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          mrp: 1,
          sellingPrice: 1,
          discountPercentage: 1,
          category: "$categoryData.name",
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      },
    ];
    // execute query
    const getCategories = await ProductModel.aggregate(aggregatePipeline);
    // get total row count
    const totalRowCount = await ProductModel.countDocuments(matchQuries);
    return NextResponse.json({
      success: true,
      data: getCategories,
      meta: { totalRowCount },
    });
  } catch (error) {
    console.log(error);
  }
}
