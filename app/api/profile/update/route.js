import User from "../../../../model/user.model";
import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";

export async function PUT(request) {
  try {
    await connectDb();
    const auth = await isAuthenticated("user");
    if (!auth?.isAuth) {
      return responce(false, 401, "Unauthorized");
    }
    const formData=await request.formData()
    const file=formData?.get('file')
    const name=formData?.get('name')
    const address=formData?.get('address')
    const phone=formData?.get('phone')
    const user = await User.findById(auth?.userId);
    return responce(true, 200, "profile fetched", user);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
