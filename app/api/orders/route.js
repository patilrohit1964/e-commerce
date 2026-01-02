import { NextResponse } from "next/server";
import connectDb from "../../../lib/dbConnect";
import { responce } from "../../../lib/helper";
import { isAuthenticated } from "../../../lib/isAuth";
import OrderModal from "../../../model/order.model";

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
        { order_id: { $regex: globalFilter, $options: "i" } },
        { payment_id: { $regex: globalFilter, $options: "i" } },
        { name: { $regex: globalFilter, $options: "i" } },
        { phone: { $regex: globalFilter, $options: "i" } },
        { email: { $regex: globalFilter, $options: "i" } },
        { country: { $regex: globalFilter, $options: "i" } },
        { state: { $regex: globalFilter, $options: "i" } },
        { city: { $regex: globalFilter, $options: "i" } },
        { pincode: { $regex: globalFilter, $options: "i" } },
        { subTotal: { $regex: globalFilter, $options: "i" } },
        { discount: { $regex: globalFilter, $options: "i" } },
        { couponDiscountAmount: { $regex: globalFilter, $options: "i" } },
        { totalAmount: { $regex: globalFilter, $options: "i" } },
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
    ];
    // execute query
    const getOrders = await OrderModal.aggregate(aggregatePipeline);
    // get total row count
    const totalRowCount = await OrderModal.countDocuments(matchQuries);
    return NextResponse.json({
      success: true,
      data: getOrders,
      meta: { totalRowCount },
    });
  } catch (error) {
    console.log(error);
  }
}
