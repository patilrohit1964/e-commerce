import connectDb from "@/lib/dbConnect";
import { catchError, isAuthenticated, responce } from "@/lib/helper";
import MEDIAModel from "@/model/media.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const auth = isAuthenticated("admin");
    if (!(await auth).isAuth) {
      return responce(false, 403, "unauthorized");
    }
    await connectDb();
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page"), 10) || 0;
    const limit = parseInt(searchParams.get("limit"), 10) || 10;
    const deleteType = parseInt(searchParams.get("deleteType")); //sd=>soft del,rsd=>restore del,pd=>permenent del;
    const filter = {};
    if (deleteType === "SD") {
      filter = { deletedAt: null };
    } else if (deleteType === "PD") {
      filter = { deletedAt: { $ne: null } };
    }
    const mediaData = await MEDIAModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit)
      .lean();
    const totalMedia = await MEDIAModel.countDocuments(filter);
    return NextResponse.json({
      mediaData: mediaData,
      hasMore: (page + 1) * limit < totalMedia,
    });
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
