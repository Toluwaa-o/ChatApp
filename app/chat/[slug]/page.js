import ChatHead from "../components/ChatHead";
import Chats from "@/data/tempChatData";
import SendMessage from "../components/SendMessage";
import Messages from "../components/Messages";

export const metadata = {
  title: "Person - ChatApp",
};

const IndividualChatPage = () => {
  return (
    <div>
      <ChatHead />
      <Messages Chats={Chats} />
      <SendMessage />
    </div>
  );
};
export default IndividualChatPage;
