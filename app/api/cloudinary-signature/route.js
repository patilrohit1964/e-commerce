import cloudinary from "@/lib/cloudinary";
import { responce } from "@/lib/helper";

export async function POST(req) {
  try {
    const payload = await req.json();
    const { paramsToSign } = payload;
    const signature = cloudinary.utils.api_sign_request();
    return responce(true, 200, "upload successfull", signature);
  } catch (error) {
    console.log(error);
  }
}
