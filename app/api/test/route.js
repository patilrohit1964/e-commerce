import connectDb from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  const ans = await connectDb();
  console.log("ans", ans);
  return NextResponse.json({
    success: true,
    message: "connection success",
  });
}
