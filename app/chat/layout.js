import AuthInputs from "../components/AuthInputs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Search from "./components/Search";
import Header from "./components/Chats/Header";
import OnlineChats from "./components/Chats/OnlineChats";
import Chats from "./components/Chats/Chats";

export default function ChatLayout({ children }) {
  const token = cookies().get("tjw");

  if (!token) {
    return <AuthInputs isSignIn={true} fromComponent={true} />;
  }

  const isValid = jwt.verify(token.value, process.env.JWT_SECRET);

  if (!isValid) {
    return <AuthInputs isSignIn={true} fromComponent={true} />;
  }

  return (
    <div className="flex min-h-screen md:h-[100vh] md:w-[100vw] overflow-auto">
      <span className="hidden md:flex flex-col gap-3 p-3 w-[33%] pr-3 h-[100vh] md:fixed">
        <Header />
        <Search />
        <span className="">
          <span className="hidden md:grid grid-flow-col auto-cols-[15%] overflow-x-scroll gap-4 scroll no-scrollbar p-3 ">
            <OnlineChats />
          </span>
          <h2 className="text-lg font-bold text-gray-700  md:py-3">Friends</h2>
          <div className="flex flex-col gap-4 overflow-y-scroll no-scrollbar">
            <Chats />
          </div>
        </span>
      </span>
      <span className="w-full md:w-[67%] md:ml-auto">{children}</span>
    </div>
  );
}

export const revalidate = 0;
