import connectDb from "@/lib/dbConnect";
import { responce } from "@/lib/helper";
import { isAuthenticated } from "@/lib/isAuth";
import CategoryModel from "@/model/category.model";
import { NextResponse } from "next/server";

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
    const filters = [];
    const globalFilter = parseInt(searchParams.get("globalFilter") || "");
    const sorting = [];
    const deleteType = parseInt(searchParams.get("deleteType"));
    // build match query
    let matchQuries = {};
    if (deleteType === "SD") {
      matchQuries = { deletedAt: { $ne: null } };
    } else if (deleteType === "PD") {
      matchQuries = { deletedAt: { $ne: null } };
    }
    // global search
    if (globalFilter) {
      matchQuries["$or"] = [
        { name: { $regex: globalFilter, $options: "i" } },
        { slug: { $regex: globalFilter, $options: "i" } },
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
      { $match: matchQuries },
      { $sort: Object.keys(sortQuery)?.length ? sortQuery : { createdAt: -1 } },
      { $skip: start },
      { $limit: size },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      },
    ];
    // execute query
    const getCategories = await CategoryModel.aggregate(aggregatePipeline);
    // get total row count
    const totalRowCount = await CategoryModel.countDocuments(matchQuries);
    return NextResponse.json({
      data: getCategories,
      meta: { totalRowCount },
    });
  } catch (error) {
    console.log(error);
  }
}
