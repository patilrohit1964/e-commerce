import cloudinary from "@/lib/cloudinary";
import connectDb from "@/lib/dbConnect";
import { catchError, isAuthenticated, responce } from "@/lib/helper";
import MEDIAModel from "@/model/media.model";
import mongoose from "mongoose";

export const PUT = async (request) => {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return responce(false, 403, "unauthorized");
    }
    await connectDb();
    const payload = await request.json();
    const ids = payload.ids || [];
    const deleteType = payload.deleteType;
    if (!Array.isArray(ids) || ids?.length === 0) {
      return responce(false, 400, "invalid or empty id list");
    }
    const media = await MEDIAModel.find({ _id: { $in: ids } }).lean();
    if (!media?.length) {
      return responce(false, 404, "data not found");
    }
    if (!["SD", "RSD"].includes(deleteType)) {
      return responce(false, 400, "invalid delete operation ");
    }
    if (deleteType === "SD") {
      await MEDIAModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: new Date().toISOString() } }
      );
    } else {
      await MEDIAModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: null } }
      );
    }
    return responce(
      true,
      200,
      deleteType == "SD" ? "data moved into trash " : "data restored"
    );
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
};
export const DELETE = async (request) => {
  //this session help karel jevha mongodb chya purn field perform nahi houn jat he run krnya aadhi session madhe thevto aani jo prynt session.committransaction() method call nahi hot to prynt he tya field perform nahi kart session.committransaction() chya help ne aapn jr kahi error asel tr tya field perform thamu shkto
  const session = await mongoose.startSession();
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return responce(false, 403, "unauthorized");
    }
    await connectDb();
    const payload = await request.json();
    const ids = payload.ids || [];
    const deleteType = payload.deleteType;
    if (!Array.isArray(ids) || ids?.length === 0) {
      return responce(false, 400, "invalid or empty id list");
    }
    const media = await MEDIAModel.find({ _id: { $in: ids } })
      .session(session)
      .lean();
    if (!media?.length) {
      return responce(false, 404, "data not found");
    }
    if (!deleteType === "PD") {
      return responce(false, 400, "invalid delete operation ");
    }
    await MEDIAModel.deleteMany({ _id: { $in: ids } }).session(session);
    // del from cloudinary
    const publicIds = media.map((e) => e.public_id);
    try {
      await cloudinary.api.delete_resources(publicIds);
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      session.endSession();
    }
    await session.commitTransaction();
    session.endSession();
    return responce(true, 200, "data delete permently ");
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    return catchError(error);
  }
};
