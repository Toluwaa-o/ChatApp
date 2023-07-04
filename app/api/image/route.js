import prismaConnect from "@/Utils/prismaconnect";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = prismaConnect();

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

  await prisma.$disconnect()

  return Response.json({ msg: "Profile picture updated!" });
};
