import mongoose from "mongoose";

const productVarintSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    sku: {
      type: Number,
      required: true,
    },
    medias: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        required: true,
      },
    ],
    deletedAt: {
      type: String,
      index: true,
    },
  },
  { timestamps: true }
);
const productVariantModal =
  mongoose.models.ProductVariant ||
  mongoose.model("ProductVariant", productVarintSchema);
export default productVariantModal;
