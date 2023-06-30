import * as jose from "jose";
import { cookies } from "next/dist/client/components/headers";

const createToken = async ({ userId, username }) => {
  const alg = "HS256";

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  
  const token = await new jose.SignJWT({ userId, username })
    .setProtectedHeader({ alg })
    .setExpirationTime(process.env.JWT_LIFETIME)
    .sign(secret);

  cookies().set("tjw", token, {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    httpOnly: true,
    sameSite: "lax",
  });

  return token;
};

export default createToken;
