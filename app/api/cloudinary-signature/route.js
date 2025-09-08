import { NextResponse } from "next/server";
import cloudinary from "../../../lib/cloudinary";

export async function POST(req) {
  try {
    const payload = await req.json();
    const { paramsToSign } = payload;
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );
    return NextResponse.json({ signature });
  } catch (error) {
    console.log(error);
  }
}
