import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prismaConnect from "@/Utils/prismaconnect";

const prisma = prismaConnect();

const GetOnlineUsers = async (chats) => {
  const payload = jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  const onlineUsers = await prisma.user.findMany({
    where: {
      online: true,
    },
    select: {
      image: true,
      firstName: true,
      lastName: true,
      online: true,
      id: true,
    },
  });

  let users;

  chats.filter((chat) => {
    users = chat.users.map((user) => {
      if (user.user_id != Number(payload.userId)) return { ...user };
    });
  });

  const onlineChats = [];

  users.filter((user) => {
    for (let u of onlineUsers) {
      let details;
      if (user?.user_id === u.id) {
        onlineChats.push(u);
      }

      return details;
    }
  });

  return onlineChats;
};

export default GetOnlineUsers;

export const revalidate = 0;
