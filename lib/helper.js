import { NextResponse } from "next/server";

export const responce = (success, statusCode, message, data) => {
  return NextResponse.json({
    success,
    statusCode,
    message,
    data,
  });
};

export const catchError = (error, customMessage) => {
  if (error.code === 11000) {
    const keys = Object.keys(error.keyPattern).join(",");
    error.message = `Dublicate fields: ${keys}. these fields value must be unique`;
  }

  let errorObj = {};

  if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
    errorObj = {
      message: error.message,
      error,
    };
  } else {
    errorObj = {
      message: customMessage || "internal server error",
    };
  }
  return responce(false, error.code, {...errorObj});
};

export const generatOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};
