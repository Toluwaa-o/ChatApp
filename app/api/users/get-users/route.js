import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const GET = async (request) => {
  const payload = await jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );
  const username = request.nextUrl.searchParams.get("username");

  const where = username
    ? { username: { contains: username }, NOT: { id: payload.userId } }
    : { NOT: { id: payload.userId } };

  const users = await prisma.user.findMany({
    where,
    select: {
      username: true,
      chats: true,
      id: true,
      firstName: true,
      lastName: true,
    },
    take: 10,
  });

  return NextResponse.json({ users });
};
