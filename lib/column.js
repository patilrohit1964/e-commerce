import { Chip } from "@mui/material";
import dayjs from "dayjs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

// CATEGORY COLUMNS
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

// COUPON COLUMNS
export const DT_CUSTOMER_COLUMN = [
  {
    accessorKey: "avatar",
    header: "Avatar",
    Cell: ({ renderedCellValue }) => (
      <Avatar className={"border border-gray-400"}>
        <AvatarImage
          src={
            renderedCellValue?.url ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbTqA2RGIWAc0eJeRLBsUtZUohNxNtgEW8bA&s"
          }
        />
        <AvatarFallback>avatar</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "isEmailVerified",
    header: "Is Verified",
    Cell: ({ renderedCellValue }) =>
      renderedCellValue ? (
        <Chip color="success" label="Verified" />
      ) : (
        <Chip color="error" label="Not Verified" />
      ),
  },
];

// REVIEW COLUMNS
export const DT_REVIEW_COLUMN = [
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "review",
    header: "Review",
  },
];

// ORDER COULUMN
// REVIEW COLUMNS
export const DT_ORDER_COLUMN = [
  {
    accessorKey: "order_id",
    header: "Order Id",
  },
  {
    accessorKey: "payment_id",
    header: "Payment Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "pincode",
    header: "Pin Code",
  },
  {
    accessorKey: "totalitem",
    header: "Total Item",
    Cell: ({ renderedCellValue, row }) => (
      <span>{row?.original?.products?.length || 0}</span>
    ),
  },
  {
    accessorKey: "subTotal",
    header: "Sub Total",
  },
  {
    accessorKey: "discount",
    header: "Discount",
    Cell: ({ renderedCellValue }) => (
      <span>{Math.round(renderedCellValue) || 0}</span>
    ),
  },
  {
    accessorKey: "couponDiscountAmount",
    header: "Coupon Discount",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
