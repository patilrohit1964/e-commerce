import { NextResponse } from "next/server";
import connectDb from "../../../lib/dbConnect";
import { responce } from "../../../lib/helper";
import { isAuthenticated } from "../../../lib/isAuth";
import REVIEWModel from "../../../model/review.model";

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
        { "productData.name": { $regex: globalFilter, $options: "i" } },
        { "userData.name": { $regex: globalFilter, $options: "i" } },
        { rating: { $regex: globalFilter, $options: "i" } },
        { title: { $regex: globalFilter, $options: "i" } },
        { review: { $regex: globalFilter, $options: "i" } },
      ];
    }

    // column filter
    filters?.forEach((fil) => {
      if (fil?.id === "product") {
        matchQuries["productData.name"] = {
          $regex: fil?.value,
          $options: "i",
        };
      } else if (fil?.id === "user") {
        matchQuries["userData.name"] = { $regex: fil?.value, $options: "i" };
      } else {
        matchQuries[fil?.id] = { $regex: fil?.value, $options: "i" };
      }
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
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productData",
        },
      },
      {
        $unwind: {
          path: "$productData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $unwind: {
          path: "$userData",
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
          product: "$productData.name",
          user: "$userData.name",
          rating: 1,
          title: 1,
          review: 1,
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      },
    ];
    // execute query
    const getReview = await REVIEWModel.aggregate(aggregatePipeline);
    // get total row count
    const totalRowCount = await REVIEWModel.countDocuments(matchQuries);
    return NextResponse.json({
      success: true,
      data: getReview, //check this url data
      meta: { totalRowCount },
    });
  } catch (error) {
    console.log(error);
  }
}
