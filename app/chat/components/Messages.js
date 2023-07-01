"use client";

import moment from "moment";
import checkMark from "@/Utils/check";
import { useEffect, useRef } from "react";

const Messages = ({ Chats, id }) => {
  const myRef = useRef(null);

  useEffect(() => {
    if (Chats.length) {
      myRef.current.scrollIntoView();
    }
  }, []);

  if (!Chats.length) return <></>;

  return (
    <span className="flex flex-col gap-2 p-3 overflow-y-scroll py-[10vh]">
      {Chats.map((msg) => {
        if (msg.user_id === id) {
          return (
            <span
              className={`self-end max-w-[70vw] text-right text-white p-2 rounded-lg bg-purple-700 flex flex-col gap-2`}
              key={msg.id}
            >
              <p>{msg.message}</p>
              <span className="flex justify-end gap-2 items-center">
                <p className="text-xs">
                  {moment(msg.createdAt).format("hh:mm")}
                </p>
                {checkMark(msg.viewed)}
              </span>
            </span>
          );
        } else {
          return (
            <span
              className="self-start max-w-[70vw] text-purple-700 border border-purple-700 p-2 rounded-lg flex flex-col gap-2"
              key={msg.id}
            >
              <p>{msg.message}</p>
              <p className="text-xs">{moment(msg.createdAt).format("hh:mm")}</p>
            </span>
          );
        }
      })}
      {Chats.length && <span ref={myRef}></span>}
    </span>
  );
};
export default Messages;
