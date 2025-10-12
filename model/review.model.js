import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    review: {
      type: String,
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
const REVIEWModel =
  mongoose.models.Review || mongoose.model("Review", reviewSchema);
export default REVIEWModel;
