import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default cloudinary;
