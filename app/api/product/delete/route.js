import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";
import CategoryModel from "../../../../model/category.model";

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
    const category = await CategoryModel.find({ _id: { $in: ids } }).lean();
    if (!category?.length) {
      return responce(false, 404, "data not found");
    }
    if (!["SD", "RSD"].includes(deleteType)) {
      return responce(false, 400, "invalid delete operation ");
    }
    if (deleteType === "SD") {
      await CategoryModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: new Date().toISOString() } }
      );
    } else {
      await CategoryModel.updateMany(
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
    const category = await CategoryModel.find({ _id: { $in: ids } }).lean();
    if (!category?.length) {
      return responce(false, 404, "data not found");
    }
    if (deleteType !== "PD") {
      return responce(false, 400, "invalid delete operation ");
    }
    await CategoryModel.deleteMany({ _id: { $in: ids } });
    return responce(true, 200, "data deleted permanently ");
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
};
