import connectDb from "@/lib/dbConnect";
import { responce } from "@/lib/helper";
import { zSchmea } from "@/lib/zodSchema";

export async function POST(req) {
  try {
    await connectDb();
    const validationSchema = zSchmea.pick({
      password: true,
    });
    const payload = await req.json();
    const validatedData = validationSchema.safeParse(payload);
    if (!validatedData.success) {
      return responce(
        false,
        401,
        "invalid or missing fields",
        validatedData.error
      );
    }
    const { password } = validatedData.data;
    return responce(true, 200, "password updated", validatedData.data);
  } catch (error) {
    responce(false, 500, "internal server error", error);
    console.log(error);
  }
}
