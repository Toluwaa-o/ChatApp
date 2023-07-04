import Search from "./components/Search";
import Header from "./components/Chats/Header";
import OnlineUsers from "./components/Chats/OnlineChats";
import Chats from "./components/Chats/Chats";

const ChatPage = () => {
  return (
    <>
      <div className="p-3 flex flex-col gap-3 md:hidden">
        <Header />
        <Search />
        <span className="grid grid-flow-col auto-cols-[20%] overflow-x-scroll gap-4 scroll no-scrollbar p-3 md:hidden">
          <OnlineUsers />
        </span>
        <h2 className="text-lg font-bold text-gray-700 md:hidden">Friends</h2>
        <div className="flex flex-col gap-4 md:hidden overflow-y-scroll no-scrollbar">
          <Chats />
        </div>
      </div>
      <span className="hidden md:grid w-full h-full place-content-center p-7 bg-purple-100">
        <h1 className="text-5xl text-center text-gray-400 w-2/3 m-auto">
          Click on the left to load your messages!
        </h1>
      </span>
    </>
  );
};

export default ChatPage;

export const revalidate = 0;
