import Online from "./Online";
import Link from "next/link";
import prismaConnect from "@/Utils/prismaconnect";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import GetTime from "@/Utils/getTime";
import CheckUnreadMessages from "@/Utils/checkUnreadMessages";

const prisma = prismaConnect();

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
        online={online}
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
        <p className="text-[0.64rem] font-semibold text-gray-500">
          {GetTime({ messages, createdAt })}
        </p>
        {!unreadMessages.length ? null : (
          <span className="w-[18px] h-[18px] bg-green-400 rounded-full mx-auto mt-2 text-xs text-white grid place-content-center">
            {unreadMessages.length}
          </span>
        )}
      </span>
    </Link>
  );
};
export default Chat;
