import { jwtVerify } from "jose";
import { cookies } from "next/headers";
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
  return responce(false, error.code, { ...errorObj });
};

export const generatOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};

export const isAuthenticated = async (role) => {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.has("access_token")) {
      return {
        isAuth: false,
      };
    }
    const access_token = cookieStore.get("access_token");
    const { payload } = await jwtVerify(
      access_token.value,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
    );
    if (payload !== role) {
      return {
        isAuth: false,
      };
    }
    return {
      isAuth: true,
      userId: payload._id,
    };
  } catch (error) {
    console.log(error);
    return {
      isAuth: false,
      error,
    };
  }
};
