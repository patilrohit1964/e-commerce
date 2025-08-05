import { catchError } from "@/lib/helper";

export async function POST(req) {
  try {
  } catch (error) {
    console.log(error);
    return catchError(error);
  }
}
