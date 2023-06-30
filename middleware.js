import { NextResponse } from "next/server";
import * as jose from 'jose'

export const middleware = async (request) => {
  const token = request.cookies.get("tjw")?.value;

  if (!token) {
    return NextResponse.json({ msg: "Invalid request" }, { status: 400 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return NextResponse.json({ msg: "Invalid request" }, { status: 400 });
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/api/auth/me", "/api/messages/:path*", "/api/users/:path*"],
};
