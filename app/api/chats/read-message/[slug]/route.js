import prismaConnect from "@/Utils/prismaconnect";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = prismaConnect();

export const PATCH = async (request, { params: { slug } }) => {
  const payload = jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  if (!slug) {
    return NextResponse.json(
      { msg: "Please provide all the neccessary details" },
      { status: 400 }
    );
  }

  await prisma.message.updateMany({
    where: {
      chat_id: Number(slug),
      user_id: { not: Number(payload.userId) },
    },
    data: {
      viewed: true,
    },
  });

  await prisma.$disconnect()

  return NextResponse.json({ msg: "Messages updated successfully!" });
};
