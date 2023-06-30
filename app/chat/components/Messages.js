"use client";

import checkMark from "@/Utils/check";
import { useEffect, useRef } from "react";

const Messages = ({ Chats }) => {
  const myRef = useRef(null);

  useEffect(() => {
    myRef.current.scrollIntoView();
  }, []);

  return (
    <span className="flex flex-col gap-2 p-3 overflow-y-scroll py-[10vh]">
      {Chats.map((chat) => {
        if (chat.user_id) {
          return (
            <span
              className={`self-end max-w-[70vw] text-right text-white p-2 rounded-lg bg-purple-700 flex flex-col gap-2`}
              key={chat.id}
            >
              <p>{chat.message}</p>
              <span className="flex justify-end gap-2 items-center">
                <p className="text-xs">12:00PM</p>
                {checkMark(chat.viewed)}
              </span>
            </span>
          );
        } else {
          return (
            <span
              className="self-start max-w-[70vw] text-purple-700 border border-purple-700 p-2 rounded-lg flex flex-col gap-2"
              key={chat.id}
            >
              <p>{chat.message}</p>
              <p className="text-xs">12:00PM</p>
            </span>
          );
        }
      })}
      <span ref={myRef}></span>
    </span>
  );
};
export default Messages;
