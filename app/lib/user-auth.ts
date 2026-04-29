import { NextRequest } from "next/server";
import * as jwt from "jsonwebtoken";

export type UserJwtPayload = {
  id: string;
  email: string;
};

export const USER_COOKIE_NAME = "user_token";

export function getUserTokenFromRequest(request: NextRequest) {
  return request.cookies.get(USER_COOKIE_NAME)?.value || null;
}

export function verifyUserToken(token: string): UserJwtPayload | null {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    return jwt.verify(token, secret) as UserJwtPayload;
  } catch {
    return null;
  }
}

export function requireUser(request: NextRequest) {
  const token = getUserTokenFromRequest(request);

  if (!token) {
    return {
      ok: false as const,
      message: "Unauthorized",
      user: null,
    };
  }

  const user = verifyUserToken(token);

  if (!user) {
    return {
      ok: false as const,
      message: "Invalid or expired session",
      user: null,
    };
  }

  return {
    ok: true as const,
    message: "Authorized",
    user,
  };
}