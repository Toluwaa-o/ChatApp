"use client";

import Link from "next/link";
import { TbError404 } from "react-icons/tb";

const NotFoundPage = () => {
  return (
    <div className="grid gap-4 place-content-center w-screen h-screen text-center p-4">
      <span className="mb-5">
        <TbError404 size={170} className="m-auto" color="purple" />
        <p className="text-gray-500 font-bold text-lg">Sorry, page not found</p>
      </span>

      <Link
        className="uppercase text-purple-900 text-sm border-2 border-purple-900 font-extrabold tracking-wider p-3 rounded-md"
        href="/chat"
      >
        Go back to chats
      </Link>
    </div>
  );
};
export default NotFoundPage;
