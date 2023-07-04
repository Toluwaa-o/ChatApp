import getChats from "@/libs/getChats";
import Online from "../Online";
import GetOnlineUsers from "@/libs/getOnlineUsers";

const Chats = async () => {
  const chats = await getChats();

  const onlineUsers = await GetOnlineUsers(chats);

  if(!onlineUsers) return
  return (
    <>
      {onlineUsers.map((user) => {
        return <Online key={user.id} {...user} />;
      })}
    </>
  );
};
export default Chats;
