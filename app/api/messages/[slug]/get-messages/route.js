import prismaConnect from "@/Utils/prismaconnect";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = prismaConnect();

export const GET = async (request, { params: { slug } }) => {
  const number = request.nextUrl.searchParams.get("number") || 10;

  if (!slug) {
    return NextResponse.json(
      { msg: "Please provide the chat id" },
      { status: 400 }
    );
  }

  const payload = await jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  const isUserInChat = await prisma.chat.findFirst({
    where: {
      id: Number(slug),
      users: {
        some: {
          user_id: payload.userId,
        },
      },
    },
    include: {
      users: true,
    },
  });

  if (!isUserInChat) {
    return NextResponse.json(
      { msg: "User is unauthorized to access these messages!" },
      { status: 401 }
    );
  }

  const messages = await prisma.message.findMany({
    where: {
      chat_id: Number(slug),
    },
    select: {
      message: true,
      id: true,
      user: true,
    },
    take: number,
  });

  await prisma.$disconnect()

  return NextResponse.json({ messages });
};
