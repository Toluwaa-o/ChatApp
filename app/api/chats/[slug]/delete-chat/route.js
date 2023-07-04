import prismaConnect from "@/Utils/prismaconnect";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = prismaConnect();

export const DELETE = async (request, { params: { slug } }) => {
  const payload = jwt.verify(
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

  await prisma.chat_Users.deleteMany({
    where: {
      chat_id: Number(slug),
    },
  });

  await prisma.message.deleteMany({
    where: {
      chat_id: Number(slug),
    },
  });

  await prisma.chat.delete({
    where: {
      id: Number(slug),
    },
  });

  return NextResponse.json({
    msg: "Success! You have successfully removed friend!",
  });
};
