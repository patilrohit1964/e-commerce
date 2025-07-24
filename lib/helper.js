import { NextResponse } from "next/server";

export const responce = (success, statusCode, message, data) => {
  return NextResponse.json({
    success,
    statusCode,
    message,
    data,
  });
};
