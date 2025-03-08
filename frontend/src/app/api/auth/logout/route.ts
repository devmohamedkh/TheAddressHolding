import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  (await cookies()).delete("refreshToken");

  return NextResponse.redirect("/login");
}
