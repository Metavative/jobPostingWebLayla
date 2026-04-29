import { USER_COOKIE_NAME } from "@/app/lib/user-auth";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    {
      success: true,
      message: "User logged out successfully",
    },
    { status: 200 }
  );

  response.cookies.set({
    name: USER_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}