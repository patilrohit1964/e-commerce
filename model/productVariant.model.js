import mongoose from "mongoose";

const productVarintSchema = new mongoose.Schema(
  {
    productId: {
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
      type: String,
      required: true,
      trim: true,
      unique: true,
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
const ProductVariantModal =
  mongoose.models.ProductVariant ||
  mongoose.model("ProductVariant", productVarintSchema);
export default ProductVariantModal;
