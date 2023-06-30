import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const POST = async (request) => {
  const token = cookies().get("tjw");

  const isValid = await jwt.verify(token.value, process.env.JWT_SECRET);

  const { image } = await request.json();
  await prisma.user.update({
    where: {
      id: Number(isValid.userId),
    },
    data: {
      image,
    },
  });

  return Response.json({ msg: "Profile picture updated!" });
};
