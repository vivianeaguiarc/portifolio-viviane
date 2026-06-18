import { NextResponse } from "next/server";
import { APP_VERSION } from "@/constants/version";
import { applySecurityHeaders } from "@/lib/security-headers";

export const dynamic = "force-dynamic";

export async function GET() {
  const response = NextResponse.json({
    status: "ok",
    version: APP_VERSION,
    timestamp: new Date().toISOString(),
  });

  return applySecurityHeaders(response);
}
