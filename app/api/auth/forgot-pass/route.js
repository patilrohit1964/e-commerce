import connectDb from "@/lib/dbConnect";
import { responce } from "@/lib/helper";
import { zSchmea } from "@/lib/zodSchema";
import User from "@/model/user.model";
import { jwtVerify } from "jose";

export async function POST(req) {
  try {
    await connectDb();
    const validationSchema = zSchmea.pick({
      password: true,
    });
    const payload = await req.json();
    console.log("payload", payload);
    const validatedData = validationSchema.safeParse(payload);
    if (!validatedData.success) {
      return responce(
        false,
        401,
        "invalid or missing fields",
        validatedData.error
      );
    }
    const { password } = validatedData.data;
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const decoded = await jwtVerify(payload.token, secret);
    const user = await User.findByIdAndUpdate(
      decoded.payload.userId,
      password,
      { new: true }
    );
    return responce(true, 200, "password updated", validatedData.data);
  } catch (error) {
    responce(false, 500, "internal server error", error);
    console.log(error);
  }
}
