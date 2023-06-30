import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export const PATCH = async (request) => {
  const payload = await jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  const data = await request.json();

  if(data.password){
    data.password = await bcrypt.hash(data.password, 10)
  }

  const user = await prisma.user.update({
    where: {
      id: Number(payload.userId),
    },
    data,
  });

  return NextResponse.json({ user });
};
