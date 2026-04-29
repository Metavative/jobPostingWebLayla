import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "../../../lib/admin-auth";

export async function GET(request: NextRequest) {
  const auth = requireAdmin(request);

  if (!auth.ok) {
    return NextResponse.json(
      { success: false, message: auth.message },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      admin: auth.admin,
    },
    { status: 200 }
  );
}