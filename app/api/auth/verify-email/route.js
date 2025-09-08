import { jwtVerify } from "jose";
import connectDb from "../../../../lib/dbConnect";
import { responce } from "../../../../lib/helper";
import User from "../../../../model/user.model";

export async function POST(req) {
  try {
    await connectDb();
    const { token } = await req.json();
    if (!token) {
      return responce(false, 400, "missing token");
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const decoded = await jwtVerify(token, secret);
    const userId = decoded.payload.userId;

    const user = await User.findById({ _id: userId });
    if (!user) {
      return responce(false, 404, "user not found");
    }
    user.isEmailVerified = true;
    await user.save();
    return responce(true, 200, "email verification success");
  } catch (error) {
    console.log(error);
  }
}
