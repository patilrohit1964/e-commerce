import { z } from "zod";

export const zSchmea = z.object({
  email: z.string().email({ message: "invalid email address" }),

  password: z
    .string()
    .min(8, { message: "password must be at least 8 character long" })
    .max(64, { message: "password must be at 64 character long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),

  name: z
    .string()
    .min(2, { message: "name must be at least 2 character" })
    .max(50, { message: "name must be at must 50 charachter" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "name can only contain letters and spaces",
    }),

  otp: z.string().regex(/^\d{6}$/, {
    message: "otp must be a 6 digit number",
  }),

  _id: z.string().min(3, "_id is required"),

  alt: z.string().min(3, "alt is required"),

  title: z.string().min(3, "title is required"),

  slug: z.string().min(3, "slug is required"),

  category: z.string().min(3, "category is required"),

  mrp: z.union([
    z.number().positive("expected positive value, received negative"),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "please enter a valid number"),
  ]),

  sellingPrice: z.union([
    z.number().positive("expected positive value, received negative"),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "please enter a valid number"),
  ]),

  discountPercentage: z.union([
    z.number().positive("expected positive value, received negative"),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "please enter a valid number"),
  ]),

  discription: z.string().min(3, "Product description is required"),

  medias: z.array(z.string()),

  productId: z.string().min(3, "Product name is required"),

  sku: z.string().min(3, "Product sku is required"),

  size: z.string(),

  color: z.string().min(3, "Product color is required"),

  originalPrice: z.union([
    z.number().positive("expected positive value, received negative"),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "please enter a valid number"),
  ]),

  stock: z.union([
    z.number().positive("expected positive value, received negative"),
    z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, "please enter a valid number"),
  ]),
});
