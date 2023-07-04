import prismaConnect from "@/Utils/prismaconnect";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = prismaConnect();

export const POST = async (request) => {
  const payload = await jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  const { friend } = await request.json();

  if (!friend) {
    return NextResponse.json(
      { msg: "Friend was not provided!" },
      { status: 400 }
    );
  }

  const chat = await prisma.chat.create({
    data: { name: "Group" },
  });

  if (!chat) {
    return NextResponse.json(
      { msg: "Something went wrong, please try again later!" },
      { status: 500 }
    );
  }

  const users = [Number(friend), Number(payload.userId)];

  const chatData = users.map((user_id) => {
    return {
      chat_id: chat.id,
      user_id,
    };
  });

  await prisma.chat_Users.createMany({
    data: chatData,
  });

  await prisma.$disconnect()

  return NextResponse.json({ msg: "Success! Chat created successfully!" });
};
