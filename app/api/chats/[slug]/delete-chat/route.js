import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const DELETE = async (request, { params: { slug } }) => {
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
  });

  if (!isUserInChat) {
    return NextResponse.json(
      { msg: "User is not a member of this chat!" },
      { status: 401 }
    );
  }

  await prisma.usersInChat.delete({
    where: {
      user_id_chat_id: {
        user_id: payload.userId,
        chat_id: Number(slug),
      },
    },
  });

  return NextResponse.json({ msg: "Success! You have left the chat" });
};
