import ChatHead from "../components/ChatHead";
import SendMessage from "../components/SendMessage";
import Messages from "../components/Messages";
import prismaConnect from "@/Utils/prismaconnect";
import GetOtherUser from "@/Utils/getOtherUser";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { notFound } from "next/navigation";

const prisma = prismaConnect();

export const getChat = async (slug) => {
  const payload = jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  const chat = await prisma.chat.findFirst({
    where: {
      id: Number(slug),
    },
    select: {
      messages: true,
      createdAt: true,
      users: true,
    },
  });

  const userIsIncluded = await prisma.chat_Users.findFirst({
    where: { user_id: Number(payload.userId), chat_id: Number(slug) },
  });

  if (!userIsIncluded) notFound();

  return chat;
};

export const generateMetadata = async ({ params: { slug } }) => {
  const chat = await getChat(slug);
  const otherUser = await GetOtherUser(chat.users);

  return {
    title: `${otherUser.firstName} ${otherUser.lastName} - ChatApp`,
  };
};

const IndividualChatPage = async ({ params: { slug } }) => {
  const payload = jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  const chat = await getChat(slug);
  const otherUser = await GetOtherUser(chat.users);

  return (
    <div className="w-[100%]">
      <ChatHead {...otherUser} id={Number(slug)} slug={Number(slug)} />
      <Messages
        Chats={chat.messages}
        id={Number(payload.userId)}
        slug={Number(slug)}
      />
      <SendMessage id={Number(slug)} />
    </div>
  );
};
export default IndividualChatPage;
export const revalidate = 0;
