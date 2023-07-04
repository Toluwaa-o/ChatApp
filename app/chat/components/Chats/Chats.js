import getChats from "@/libs/getChats";
import Chat from "../Chat";

const Chats = async () => {
  const chats = await getChats();

  if(!chats.length) {
    return <p className="text-center text-gray-600 italic font-medium">You have no chats yet!</p>
  }
  return (
    <>
      {chats.map((chat) => {
        return <Chat key={chat.id} {...chat} />;
      })}
    </>
  );
};
export default Chats;
