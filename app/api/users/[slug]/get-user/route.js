import prismaConnect from "@/Utils/prismaconnect";
import { NextResponse } from "next/server";

const prisma = prismaConnect();

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

  await prisma.$disconnect()

  return NextResponse.json({ user });
};
