import { isValidObjectId } from "mongoose";
import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";
import { zSchmea } from "../../../../lib/zodSchema";
import MEDIAModel from "../../../../model/media.model";
export async function PUT(req) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return responce(false, 403, "unauthorized");
    }
    await connectDb();
    const payload = await req.json();

    const filter = {
      deletedAt: null,
    };
    if (!isValidObjectId(payload?._id)) {
      return responce(false, 400, "invalid object id");
    }
    const validationEditSchema = zSchmea.pick({
      _id: true,
      title: true,
      alt: true,
    });
    const validatedEditData = validationEditSchema.safeParse(payload);
    if (!validatedEditData.success) {
      return responce(
        false,
        400,
        "invalid or missing input fields",
        validatedEditData.error
      );
    }
    const { _id, title, alt } = validatedEditData.data;
    const getMedia = await MEDIAModel.findById(_id);
    if (!getMedia) {
      return responce(false, 400, "media not found");
    }
    getMedia.alt = alt;
    getMedia.title = title;
    await getMedia.save();
    return responce(true, 200, "media update successfully");
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
