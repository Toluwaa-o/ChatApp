import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const PATCH = async (request, { params: { slug } }) => {
  const payload = await jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  const { name, accepted } = await request.json();

  const isUserInChat = await prisma.chat.findFirst({
    where: {
      id: Number(slug),
      users: {
        some: {
          user_id: payload.userId,
        },
      },
    },
  });

  if (!isUserInChat) {
    return NextResponse.json(
      { msg: "User cannot update this chat!" },
      { status: 401 }
    );
  }

  if (!accepted) {
    await prisma.usersInChat.delete({
      where: {
        user_id_chat_id: {
          user_id: payload.userId,
          chat_id: Number(slug),
        },
      },
    });

    return NextResponse.json({ msg: "Success! You have left the chat" });
  }

  const chat = await prisma.chat.update({
    where: {
      id: Number(slug),
    },
    data: {
      name,
      accepted,
    },
  });

  return NextResponse.json({ chat });
};
