import connectDb from "@/lib/dbConnect";
import { responce } from "@/lib/helper";
import { zSchmea } from "@/lib/zodSchema";
import OTPModel from "@/model/opt.model";
import User from "@/model/user.model";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    await connectDb();
    const payload = await request.json();
    const validationSchema = zSchmea.pick({
      otp: true,
      email: true,
    });
    const validatedData = validationSchema.safeParse(payload);
    if (!validatedData.success) {
      return responce(
        false,
        401,
        "invalid missig input field",
        validatedData.error
      );
    }
    const { email, otp } = validatedData.data;
    const getOtpData = await OTPModel.findOne({ email, otp });
    if (!getOtpData) {
      return responce(false, 404, "invalid or expired otp");
    }
    const getUser = await User.findOne({ deletedAt: null, email }).lean();
    if (!getUser) {
      return responce(false, 404, "user not found");
    }
    const loggedInUserData = {
      _id: getUser._id,
      role: getUser.role,
      name: getUser.name,
      avatar: getUser.avatar,
    };
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const token = await new SignJWT(loggedInUserData)
      .setIssuedAt()
      .setExpirationTime("24h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);
    const cookieStore = await cookies();
    cookieStore.set({
      name: "access_token",
      value: token,
      httpOnly: process.env.NEXT_PUBLIC_NODE_ENV === "production",
      path: "/",
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
      sameSite: "lax",
    });

    await getOtpData.deleteOne();
    return responce(true, 200, "login successfull", loggedInUserData);
  } catch (error) {
    console.log("error", error);
  }
}
