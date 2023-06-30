import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request, { params: { slug } }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(slug),
    },
    select: {
      firstName: true,
      lastName: true,
      username: true
    },
  });

  if (!user) {
    return NextResponse.json({ msg: "No user found!" }, { status: 404 });
  }

  return NextResponse.json({ user });
};
