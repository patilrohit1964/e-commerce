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

      const base64Image = `data:${file.type};base64,${Buffer.from(
        fileBuffer
      ).toString("base64")}`;

      const uploadAvatar = await cloudinary.uploader.upload(base64Image, {
        folder: "avatars",
        public_id: `avatar_${auth.userId}`,
        overwrite: true,
        invalidate: true,
      });

      user.avatar = {
        url: uploadAvatar.secure_url,
        public_id: uploadAvatar.public_id,
      };
    }

    user.name = name;
    user.phone = phone;
    user.address = address;

    await user.save();

    return responce(true, 201, "Profile Update", {
      _id: user._id.toString(),
      role: user.role,
      name: user.name,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error(error);
    return catchError(error, "Server Error");
  }
}
