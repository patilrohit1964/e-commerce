import { generateForgotPasswordEmail } from "@/email/forgotPassword";
import { responce } from "@/lib/helper";
import { sendMail } from "@/lib/sendMail";
import { zSchmea } from "@/lib/zodSchema";
import User from "@/model/user.model";
import { SignJWT } from "jose";

export async function POST(req) {
  try {
    const validateSchema = zSchmea.pick({ email: true });
    const payload = await req.json();
    const validateData = validateSchema.safeParse(payload);
    if (!validateData.success) {
      return responce(false, 401, "some fields missing");
    }
    const userExist = await User.findOne({ email: validateData.data.email });
    if (!userExist) {
      return responce(false, 404, "user not found");
    }
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const token = await new SignJWT({
      userId: userExist._id.toString(),
    })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);
    const forgotPassEmailStatus = await sendMail(
      "Request for forgot password click on below link",
      validateData.data.email,
      generateForgotPasswordEmail(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password/${token}`
      )
    );
    if (!forgotPassEmailStatus.success) {
      return responce(false, 400, "failed to send verify email link");
    }
    return responce(false, 200, "please verify your email for forgot password");
  } catch (error) {
    console.log(error);
  }
}
