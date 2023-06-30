import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/dist/client/components/headers";

const prisma = new PrismaClient();

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
