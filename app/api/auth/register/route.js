"use server";

import { emailVerificationLink } from "@/email/emailVerification";
import connectDb from "@/lib/dbConnect";
import { catchError, responce } from "@/lib/helper";
import { sendMail } from "@/lib/sendMail";
import { zSchmea } from "@/lib/zodSchema";
import User from "@/model/user.model";
import { SignJWT } from "jose";

export async function POST(req) {
  try {
    await connectDb();
    const validationSchema = zSchmea.pick({
      name: true,
      email: true,
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
    const { name, email, password } = validatedData.data;
    const existingUser = await User.exists({ email });
    if (existingUser) {
      return responce(false, 401, "user already exist");
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId: newUser._id.toString() })
      .setIssuedAt()
      .setExpirationTime("7d")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    await sendMail(
      "Email Verification from Developer Rp",
      email,
      emailVerificationLink(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`
      )
    );
    return responce(
      true,
      201,
      "Registration success, Please verify your email address"
    );
  } catch (error) {
    console.log(error);
    catchError(error);
  }
}
