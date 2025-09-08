import { generateOTPEmail } from "../../../../email/otpEmail";
import connectDb from "../../../../lib/dbConnect";
import { generatOtp, responce } from "../../../../lib/helper";
import { sendMail } from "../../../../lib/sendMail";
import { zSchmea } from "../../../../lib/zodSchema";
import OTPModel from "../../../../model/opt.model";
import User from "../../../../model/user.model";

export async function POST(request) {
  try {
    await connectDb();
    const payload = await request.json();
    const validationShchema = zSchmea.pick({ email: true });
    const validateData = validationShchema.safeParse(payload);
    if (!validateData.success) {
      return responce(
        false,
        401,
        "inlvalid or missing input field",
        validateData.error
      );
    }
    const { email } = validateData.data;
    const getUser = await User.findOne({ email });
    if (!getUser) {
      return responce(false, 404, "user not found");
    }
    // removoe all otp
    await OTPModel.deleteMany({ email });
    const otp = generatOtp();
    const newOtpData = new OTPModel({
      email,
      otp,
    });
    await newOtpData.save();
    const otpSendStatus = await sendMail(
      "Your login verification code.",
      email,
      generateOTPEmail(otp, email)
    );
    if (!otpSendStatus.success) {
      return responce(false, 400, "failed to resend otp");
    }
    return responce(true, 200, "otp send successfully");
  } catch (error) {
    console.log(error);
  }
}
