import AuthInputs from "../components/AuthInputs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Online from "./components/Online";
import Chat from "./components/Chat";
import Search from "./components/Search";
import getChats from "@/libs/getChats";

export default async function ChatLayout({ children }) {
  const token = cookies().get("tjw");

  if (!token) {
    return <AuthInputs isSignIn={true} fromComponent={true} />;
  }

  const isValid = await jwt.verify(token.value, process.env.JWT_SECRET);

  if (!isValid) {
    return <AuthInputs isSignIn={true} fromComponent={true} />;
  }

  const chats = await getChats();

  return (
    <div className="flex min-h-screen md:h-[100vh] md:w-[100vw] overflow-auto">
      <span className="hidden md:flex flex-col gap-3 p-3 w-[33%] pr-3 h-[100vh] md:fixed">
        <h1 className="text-xl font-bold text-gray-700 md:text-2xl ">Chats</h1>
        <Search />
        <span className="">
          <span className="hidden md:grid grid-flow-col auto-cols-[15%] overflow-x-scroll gap-4 scroll no-scrollbar p-3 ">
            <Online />
            <Online />
            <Online />
            <Online />
            <Online />
            <Online />
            <Online />
            <Online />
          </span>
          <h2 className="text-lg font-bold text-gray-700  md:py-3">Friends</h2>
          <div className="flex flex-col gap-4 overflow-y-scroll no-scrollbar">
            {chats.map((chat) => {
              return <Chat key={chat.id} {...chat} />;
            })}
          </div>
        </span>
      </span>
      <span className="w-full md:w-[67%] md:ml-auto">{children}</span>
    </div>
  );
}
