"use server";

import connectDb from "@/lib/dbConnect";
import { responce } from "@/lib/helper";
import { zSchmea } from "@/lib/zodSchema";
import User from "@/model/user.model";

export async function POST(req) {
  try {
    await connectDb();
    const validationSchema = zSchmea.pick({
      name: true,
      email: true,
      password: true,
    });
    const payload = await res.json();
    const validatedData = validationSchema.safeParse(payload);
    if (!validatedData.success) {
      return responce(
        false,
        401,
        "invalid or missing fields",
        validatedData.error
      );
    }
    const { name, email, password } = validatedData.data;
    const existingUser = await User.exists({ email });
    if (existingUser) {
      return responce(false, 401, "user already exist");
    }
    const newUser = new User({ name, email, password });
    await newUser.save();

    return;
  } catch (error) {
    console.log(error);
  }
}
