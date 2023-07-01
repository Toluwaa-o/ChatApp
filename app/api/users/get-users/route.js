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

  const unfilteredUsers = await prisma.user.findMany({
    where,
    select: {
      username: true,
      chats: true,
      id: true,
      firstName: true,
      lastName: true,
      image: true,
      online: true
    },
    take: 10,
  });

  const chats = await prisma.user.findUnique({
    where: { id: Number(payload.userId) },
    select: { chats: true },
  });

  const chatUsers = await prisma.chat_Users.findMany();

  const users = unfilteredUsers.map((user) => {
    // console.log(user);

    if (!user.chats.length) {
      return { ...user, friend: false };
    }

    let exists;

    for (let chat of chats.chats) {
      console.log(chat, "Chat");
      exists = chatUsers.map((cu) => {
        if (cu.user_id === user.id && cu.chat_id === chat.chat_id) {
          return cu;
        }
      });

      console.log(exists, "exists");
    }

    // console.log(exists);

    if (exists) {
      const existingChat = exists.filter((c) => {
        if (c) return c;
      });
      return { ...user, friend: true, chatId: existingChat[0].chat_id };
    }

    return { ...user, friend: false };
  });

  console.log(users, "user");

  return NextResponse.json({ unfilteredUsers, chats, users });
};
