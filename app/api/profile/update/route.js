import User from "../../../../model/user.model";
import connectDb from "../../../../lib/dbConnect";
import { catchError, responce } from "../../../../lib/helper";
import { isAuthenticated } from "../../../../lib/isAuth";
import cloudinary from "../../../../lib/cloudinary";
export async function PUT(request) {
  try {
    await connectDb();

    const auth = await isAuthenticated("user");
    if (!auth?.isAuth) {
      return responce(false, 401, "Unauthorized");
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const name = formData.get("name");
    const address = formData.get("address");
    const phone = formData.get("phone");

    const user = await User.findById(auth.userId);

    if (file) {
      const fileBuffer = await file.arrayBuffer();
      const base64Image = `data:${file?.type};base64,${Buffer.from(
        fileBuffer
      ).toString()}`;
      const uploadAvatar = cloudinary.uploader.upload(base64Image, {
        upload_preset: "avatars",
      });
      user.avatar.url = uploadAvatar.secure_url;
    }

    user.name = name;
    user.phone = phone;
    user.address = address;

    await user.save();

    return responce(true, 201, "Profile Update", user);
  } catch (error) {
    console.error(error);
    return catchError(error, "Server Error");
  }
}
