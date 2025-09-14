import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
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
    medias: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
        required: true,
      },
    ],
    discription: {
      type: String,
      required:true
    },
    deletedAt: {
      type: String,
      index: true,
    },
  },
  { timestamps: true }
);
productSchema.index({ category: 1 });
const ProductModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default ProductModel;
