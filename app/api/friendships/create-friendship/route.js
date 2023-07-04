import prismaConnect from "@/Utils/prismaconnect";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = prismaConnect();

export const PATCH = async (request) => {
  const newFriend = request.nextUrl.searchParams.get("friend");

  const payload = await jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  const friendship = await prisma.friends.update({
    where: {
      user_id: Number(payload.userId)
    },
    data: {
      friends: {
        push: Number(newFriend)
      }
    }
  })
  
  const chat = await prisma.chat.create({
    data: { friendship_id: friendship.id }
  })

  await prisma.$disconnect()

  return NextResponse.json({ user });
};
