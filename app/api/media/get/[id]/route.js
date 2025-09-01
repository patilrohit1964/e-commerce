import connectDb from "@/lib/dbConnect";
import { catchError, responce } from "@/lib/helper";
import { isAuthenticated } from "@/lib/isAuth";
import MEDIAModel from "@/model/media.model";
import { isValidObjectId } from "mongoose";

export async function GET(request, { params }) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return responce(false, 401, "unauthorized");
    }
    await connectDb();
    const getParams = await params;
    const id = getParams?.id;
    const filter = {
      deletedAt: null,
    };
    if (!isValidObjectId(id)) {
      return responce(false, 400, "invalid object id");
    }
    filter._id = id;
    const getMedia = await MEDIAModel.findOne(filter).lean();
    if (!getMedia) {
      return responce(false, 404, "media not found");
    }
    return responce(true, 200, "media found.", getMedia);
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
