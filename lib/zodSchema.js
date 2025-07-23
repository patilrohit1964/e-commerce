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
});
