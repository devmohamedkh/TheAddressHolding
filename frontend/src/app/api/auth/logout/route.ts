import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  // Remove refresh_token from cookies
  (await cookies()).delete("refreshToken");

  return NextResponse.redirect("/login");
}
