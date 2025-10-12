import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";
import REVIEWModel from "../../../../model/review.model";

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
    const getReview = await REVIEWModel.find({ _id: { $in: ids } }).lean();
    if (!getReview?.length) {
      return responce(false, 404, "data not found");
    }
    if (!["SD", "RSD"].includes(deleteType)) {
      return responce(false, 400, "invalid delete operation ");
    }
    if (deleteType === "SD") {
      await REVIEWModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: new Date().toISOString() } }
      );
    } else {
      await REVIEWModel.updateMany(
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
    const getReview = await REVIEWModel.find({ _id: { $in: ids } }).lean();
    if (!getReview?.length) {
      return responce(false, 404, "data not found");
    }
    if (deleteType !== "PD") {
      return responce(false, 400, "invalid delete operation ");
    }
    await REVIEWModel.deleteMany({ _id: { $in: ids } });
    return responce(true, 200, "data deleted permanently ");
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
};
