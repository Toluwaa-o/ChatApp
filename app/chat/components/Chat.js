import Online from "./Online";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const getUserName = async ({ id, users }) => {
  const payload = await jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  const user = users.filter((user) => {
    return user.user_id != Number(payload.userId);
  });

  return prisma.user.findUnique({
    where: { id: user[0].user_id },
    select: { firstName: true, lastName: true },
  });
};

const Chat = async (props) => {
  const { messages, id, users } = props;
  const { firstName, lastName } = await getUserName({ id: Number(id), users });

  return (
    <Link href={`/chat/${id}`} className="flex gap-4 items-center">
      <Online isNotOnlineBar={true} />
      <span>
        <h4 className="text-gray-700 font-semibold">
          {firstName} {lastName}
        </h4>
        <p className="text-sm text-gray-500">
          {messages.length
            ? messages[messages.length - 1].message
            : `Starting chatting with ${firstName}`}
        </p>
      </span>
      <span className="flex flex-col h-[100%] ml-auto">
        <p className="text-xs font-semibold text-gray-500">12:00PM</p>
        <span className="w-[8px] h-[8px] bg-green-400 rounded-full mx-auto mt-2"></span>
      </span>
    </Link>
  );
};
export default Chat;
