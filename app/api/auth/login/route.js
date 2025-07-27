import { emailVerificationLink } from "@/email/emailVerification";
import { generateOTPEmail } from "@/email/otpEmail";
import connectDb from "@/lib/dbConnect";
import { catchError, generatOtp, responce } from "@/lib/helper";
import { sendMail } from "@/lib/sendMail";
import { zSchmea } from "@/lib/zodSchema";
import OTPModel from "@/model/opt.model";
import User from "@/model/user.model";
import { SignJWT } from "jose";
import z from "zod";

export async function POST(request) {
  try {
    await connectDb();
    const payload = await request.json();
    const validationSchema = zSchmea
      .pick({
        email: true,
      })
      .extend({
        password: z.string(),
      });
    const validatedData = validationSchema.safeParse(payload);
    if (!validatedData.success) {
      return responce(
        false,
        401,
        "invalid or missing input field",
        validatedData.error
      );
    }
    const { email, password } = validatedData.data;
    const getUser = await User.findOne({ deletedAt: null, email }).select(
      "+password"
    );
    if (!getUser) {
      return responce(false, 404, "invalid login credentails");
    }

    // resend email
    if (!getUser.isEmailVerified) {
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_JWT_SECRET
      );
      const token = await new SignJWT({ userId: getUser._id })
        .setIssuedAt()
        .setExpirationTime("1h")
        .setProtectedHeader({ alg: "HS256" })
        .sign(secret);

      await sendMail(
        "Email Verification from Developer Rp",
        email,
        generateOTPEmail(otp, getUser?.name)
      );
      return responce(
        false,
        401,
        "your email is not verified. we have sent a verification link to you registerd email address."
      );
    }

    const isPassValid = await getUser.comparePassword(password);
    if (!isPassValid) {
      return responce(false, 400, "invalid login credentials");
    }
    // otp generation
    await OTPModel.deleteMany({ email }); //delet old otps
    const otp = generatOtp();
    // storing otp modal
    const newOtpData = new OTPModel({
      email,
      otp,
    });
    await newOtpData.save();
    const otpEmailStatus = await sendMail(
      "your login verification code",
      email,
      generateOTPEmail(otp, getUser?.name)
    );
    if (!otpEmailStatus.success) {
      return responce(false, 400, "failed to send otp");
    }
    return responce(true, 200, "please verify your device");
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
