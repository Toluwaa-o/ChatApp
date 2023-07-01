import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const getChats = async () => {
  const payload = await jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  const chats = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          user_id: Number(payload.userId),
        },
      },
    },
    select: {
      messages: true,
      id: true,
      users: true,
      createdAt: true
    },
  });

  return chats;
};

export default getChats;
