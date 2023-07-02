import ChatHead from "../components/ChatHead";
import SendMessage from "../components/SendMessage";
import Messages from "../components/Messages";
import prismaConnect from "@/Utils/prismaconnect";
import GetOtherUser from "@/Utils/getOtherUser";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = prismaConnect();

export const getChat = async (slug) => {
  const chat = await prisma.chat.findUnique({
    where: {
      id: Number(slug),
    },
    select: {
      messages: true,
      createdAt: true,
      users: true,
    },
  });

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
  const chat = await getChat(slug);
  const otherUser = await GetOtherUser(chat.users);
  const payload = jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  return (
    <div>
      <ChatHead {...otherUser} />
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
