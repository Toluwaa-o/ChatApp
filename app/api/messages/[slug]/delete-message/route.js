import prismaConnect from "@/Utils/prismaconnect";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = prismaConnect();

export const DELETE = async (request, { params: { slug } }) => {
  const payload = await jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  if (!slug) {
    return NextResponse.json(
      { msg: "Please provide all the neccessary details" },
      { status: 400 }
    );
  }

  const doesMessageExist = await prisma.message.findFirst({
    where: {
      id: Number(slug),
      user_id: payload.userId,
    },
  });

  if (!doesMessageExist) {
    return NextResponse.json(
      { msg: "No message found with those credentials!" },
      { status: 404 }
    );
  }

  await prisma.message.delete({
    where: {
      id: Number(slug),
    },
  });

  await prisma.$disconnect()

  return NextResponse.json({ msg: "Success! Message deleted successfully!" });
};
