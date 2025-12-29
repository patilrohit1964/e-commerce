import User from "../../../../model/user.model";
import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";

export async function GET() {
  try {
    await connectDb();
    const auth = await isAuthenticated("user");
    if (!auth?.isAuth) {
      return responce(false, 401, "Unauthorized");
    }
    const user = await User.findById(auth?.userId).lean();
    return responce(true, 200, "profile fetched", user);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
