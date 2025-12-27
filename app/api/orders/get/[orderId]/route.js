import { NextResponse } from "next/server";
import connectDb from "../../../../../lib/dbConnect";
import { responce, catchError } from "../../../../../lib/helper";
import OrderModal from "../../../../../model/order.model";
import ProductVariantModal from "../../../../../model/productVariant.model";
import ProductModal from "../../../../../model/product.model";
import MediaModal from "../../../../../model/media.model";

export async function GET(request, { params }) {
  try {
    await connectDb();
    const getParams = await params;
    const orderid = getParams?.orderId;
    if (!orderid) {
      return responce(false, 404, "Order not found");
    }
    const orderDetails = await OrderModal.findOne({
      order_id: orderid,
    })
      .populate("products.productId", "name slug")
      .populate({
        path: "products.variantId",
        populate: { path: "medias",select:'secure_url' },
      })
      .lean();
    if (!orderDetails) {
      return responce(false, 400, "order details not found");
    }
    return responce(true, 200, "Order details found", orderDetails);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
