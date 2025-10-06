import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
      trim: true,
    },
    minShoppingAmount: {
      type: Number,
      required: true,
      trim: true,
    },
    validity: {
      type: Date,
      required: true,
    },
    deletedAt: {
      type: Date,
      index: true,
      default: null,
    },
  },
  { timestamps: true }
);
const COUPONModel =
  mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
export default COUPONModel;
