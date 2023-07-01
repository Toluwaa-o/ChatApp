import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GetOtherUser = async (users) => {
  const payload = jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  const userr = users.filter((user) => {
    return user.user_id !== Number(payload.userId);
  });

  const otherUser = await prisma.user.findFirst({
    where: { id: userr[0].user_id },
    select: {
      firstName: true,
      lastName: true,
      image: true,
      online: true,
      id: true,
    },
  });

  return otherUser;
};

export default GetOtherUser;
