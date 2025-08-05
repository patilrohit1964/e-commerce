import connectDb from "@/lib/dbConnect";
import { responce } from "@/lib/helper";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await connectDb();
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    return responce(true, 200, "logout successfull");
  } catch (error) {
    console.log(error);
  }
}
