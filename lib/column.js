import { Chip } from "@mui/material";
import dayjs from "dayjs";

export const DT_CATEGORY_COLUMN = [
  {
    accessorKey: "name",
    header: "Category Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
];

// PRODUCT COLUMNS
export const DT_PRODUCT_COLUMN = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "mrp",
    header: "Mrp",
  },
  {
    accessorKey: "sellingPrice",
    header: "Selling Price",
  },
  {
    accessorKey: "discountPercentage",
    header: "Discount Percentage",
  },
];

// PRODUCT VARIANT COLUMNS
export const DT_PRODUCT_VARIANT_COLUMN = [
  {
    accessorKey: "product",
    header: "Product Name",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "sku",
    header: "Sku",
  },
  {
    accessorKey: "mrp",
    header: "Mrp",
  },
  {
    accessorKey: "sellingPrice",
    header: "Selling Price",
  },
  {
    accessorKey: "discountPercentage",
    header: "Discount Percentage",
  },
];

// COUPON COLUMNS
export const DT_COUPON_VARIANT_COLUMN = [
  {
    accessorKey: "code",
    header: "Code Name",
  },
  {
    accessorKey: "minShoppingAmount",
    header: "Min Shopping Amount",
  },
  {
    accessorKey: "discountPercentage",
    header: "Discount Percentage",
  },
  {
    accessorKey: "validity",
    header: "Validity",
    Cell: ({ renderedCellValue }) =>
      new Date() > new Date(renderedCellValue) ? (
        <Chip
          color="error"
          label={dayjs(renderedCellValue).format("DD/MM/YYYY")}
        />
      ) : (
        <Chip
          color="success"
          label={dayjs(renderedCellValue).format("DD/MM/YYYY")}
        />
      ),
  },
];
