import cloudinary from "@/lib/cloudinary";
import { responce } from "@/lib/helper";

export async function POST(req) {
  try {
    const payload = await req.json();
    const { paramsToSign } = payload;
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
    );
    return responce(true, 200, "upload successfull", signature);
  } catch (error) {
    console.log(error);
  }
}
