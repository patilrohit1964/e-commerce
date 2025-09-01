import cloudinary from "@/lib/cloudinary";
import connectDb from "@/lib/dbConnect";
import { catchError, responce } from "@/lib/helper";
import { isAuthenticated } from "@/lib/isAuth";
import MEDIAModel from "@/model/media.model";

export async function POST(req) {
  const payload = await req.json();
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return responce(false, 401, "unauthorized");
    }
    await connectDb();
    const newMedia = await MEDIAModel.insertMany(payload);
    return responce(true, 200, "media upload successfully", newMedia);
  } catch (error) {
    console.log(error, "error from cloudinary insert");
    if (payload && payload?.length > 0) {
      const publicIds = payload.map((data) => data.public_id);
      try {
        await cloudinary.api.delete_resources(publicIds);
      } catch (deleteError) {
        error.cloudinary = deleteError;
        console.log(error, "error from cloudinary delete");
      }
    }
    return catchError(error);
  }
}
