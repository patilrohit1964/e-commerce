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
    const validatedData = validationSchema.safeParse(payload);
    if (!validatedData.success) {
      return responce(
        false,
        401,
        "invalid or missing fields",
        validatedData.error
      );
    }
    const { password, token } = payload;
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const decoded = await jwtVerify(token, secret);
    const user = await User.findById(decoded.payload.userId);
    if (!user) {
      return responce(false, 404, "User not found", null);
    }
    user.password = password;
    await user.save();
    return responce(true, 200, "Password updated", { userId: user._id });
  } catch (error) {
    console.log(error);
    return responce(false, 500, "internal server error", error);
  }
}
