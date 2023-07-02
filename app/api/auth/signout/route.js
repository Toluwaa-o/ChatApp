import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prismaConnect from "@/Utils/prismaconnect";

const prisma = prismaConnect()

export const GET = async () => {
  const payload = jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  cookies().delete("tjw");
  await prisma.user.update({
    where: { id: Number(payload.userId) },
    data: { online: false },
  });

  return NextResponse.json({ msg: "Logged Out! Come back soon." });
};
