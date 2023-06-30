import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const DELETE = async () => {
  const payload = await jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  await prisma.user.delete({
    where: {
      id: Number(payload.userId),
    },
  });

  return NextResponse.json({ msg: "Your account has been deleted!" });
};
