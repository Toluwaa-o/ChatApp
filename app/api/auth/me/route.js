import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/dist/client/components/headers";
import prismaConnect from "@/Utils/prismaconnect";

const prisma = prismaConnect();

export const GET = async () => {
  const payload = await jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
    select: {
      email: true,
      id: true,
    },
  });

  return NextResponse.json({ user });
};
