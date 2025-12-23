import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import { zSchmea } from "../../../../lib/zodSchema";
import COUPONModel from "../../../../model/coupon.model";

export async function POST(request) {
  try {
    await connectDb();
    const payload = await request?.json();
    const couponFormSchema = zSchmea.pick({
      code: true,
      minShoppingAmount: true,
    });
    const validated = couponFormSchema.safeParse(payload);
    if (!validated?.success) {
      return responce(
        false,
        400,
        "missing or invalid fields data",
        validated?.error
      );
    }
    const { code, minShoppingAmount } = validated?.data;
    const couponData = await COUPONModel.findOne({ code: code }).lean();
    if (!couponData) {
      return responce(false, 400, "invalid or expire coupon", couponData);
    }
    if (new Date() > couponData?.validity) {
      return responce(false, 400, "Coupon code expired");
    }
    if (minShoppingAmount < couponData?.minShoppingAmount) {
      return responce(false, 400, `in-sufficient shopping amount for this coupon code shopping amount should be greater than ${couponData?.minShoppingAmount}`);
    }
    return responce(true, 200, "coupon applied successfully", couponData);
  } catch (error) {
    return catchError(error);
  }
}
