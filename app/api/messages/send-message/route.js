import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const POST = async (request) => {
  const chat_id = Number(request.nextUrl.searchParams.get("chat"));

  const { message } = await request.json();

  const payload = await jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  if (!message || !chat_id || !payload.userId) {
    return NextResponse.json(
      { msg: "Please provide all the neccessary values" },
      { status: 400 }
    );
  }

  const newMessage = await prisma.message.create({
    data: { message, chat_id, user_id: payload.userId },
  });

  return NextResponse.json({ msg: "Success! Message sent successfully.", newMessage });
};
