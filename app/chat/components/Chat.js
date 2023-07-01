import Online from "./Online";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import GetTime from "@/Utils/getTime";
import CheckUnreadMessages from "@/Utils/checkUnreadMessages";

const prisma = new PrismaClient();

export const getUserName = async ({ users }) => {
  const payload = await jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  const user = users.filter((user) => {
    return user.user_id != Number(payload.userId);
  });

  return prisma.user.findUnique({
    where: { id: user[0].user_id },
    select: { firstName: true, lastName: true, image: true, online: true },
  });
};

const Chat = async (props) => {
  const { messages, id, users, createdAt } = props;
  const { firstName, lastName, image, online } = await getUserName({ users });
  const unreadMessages = CheckUnreadMessages(messages);

  return (
    <Link href={`/chat/${id}`} className="flex gap-4 items-center">
      <Online
        isNotOnlineBar={true}
        image={image}
        firstName={firstName}
        lastName={lastName}
      />
      <span>
        <h4 className="text-gray-700 font-semibold">
          {firstName} {lastName}
        </h4>
        <p className="text-sm text-gray-500">
          {messages.length
            ? messages[messages.length - 1].message
            : `Start chatting with ${firstName}!`}
        </p>
      </span>
      <span className="flex flex-col h-[100%] ml-auto">
        <p className="text-xs font-semibold text-gray-500">
          {GetTime({ messages, createdAt })}
        </p>
        {!messages.length ? null : (
          <span className="w-[8px] h-[8px] bg-green-400 rounded-full mx-auto mt-2">
            {unreadMessages.length}
          </span>
        )}
      </span>
    </Link>
  );
};
export default Chat;
