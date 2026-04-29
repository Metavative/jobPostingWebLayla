import { NextRequest } from "next/server";
import * as jwt from "jsonwebtoken";

export type AdminJwtPayload = {
  id: string;
  email: string;
  role: string;
};

const COOKIE_NAME = "admin_token";

export function getAdminTokenFromRequest(request: NextRequest) {
  return request.cookies.get(COOKIE_NAME)?.value || null;
}

export function verifyAdminToken(token: string): AdminJwtPayload | null {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(token, secret) as AdminJwtPayload;
    return decoded;
  } catch {
    return null;
  }
}

export function requireAdmin(request: NextRequest) {
  const token = getAdminTokenFromRequest(request);

  if (!token) {
    return {
      ok: false as const,
      message: "Unauthorized",
      admin: null,
    };
  }

  const admin = verifyAdminToken(token);

  if (!admin) {
    return {
      ok: false as const,
      message: "Invalid or expired session",
      admin: null,
    };
  }

  return {
    ok: true as const,
    message: "Authorized",
    admin,
  };
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;