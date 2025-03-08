import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
<<<<<<< HEAD
=======
  // Remove refresh_token from cookies
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
  (await cookies()).delete("refreshToken");

  return NextResponse.redirect("/login");
}
