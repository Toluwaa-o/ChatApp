import getChats from "@/libs/getChats";
import Chat from "../Chat";

const Chats = async () => {
  const chats = await getChats();

  return (
    <>
      {chats.map((chat) => {
        return <Chat key={chat.id} {...chat} />;
      })}
    </>
  );
};
export default Chats;
