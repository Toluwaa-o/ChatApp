import prismaConnect from "@/Utils/prismaconnect";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = prismaConnect();

export const GET = async () => {
  const payload = await jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  const chats = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          user_id: payload.userId,
        },
      },
    },
    select: {
      name: true,
      users: true,
    },
  });

  return NextResponse.json({ chats });
};
