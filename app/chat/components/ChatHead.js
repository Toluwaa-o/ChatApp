"use client";

import { getColor } from "@/Utils/getColor";
import { SlOptions } from "react-icons/sl";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { IoIosArrowBack } from 'react-icons/io'
import Link from "next/link";

const ChatHead = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex gap-4 items-center p-3 bg-purple-100 fixed top-0 w-[100vw]">
      <Link href='/chat'>
        <IoIosArrowBack />
      </Link>
      <span
        className={`rounded-full grid place-content-center ${getColor()} w-[40px] h-[40px] relative border border-white`}
      >
        <p className="text-gray-700 font-bold">FN</p>
        <span className="w-[13px] h-[13px] bg-green-400 rounded-full absolute bottom-0 right-0"></span>
      </span>
      <h2 className="text-gray-500 font-medium tracking-wider">Johhny Test</h2>
      <span className="ml-auto relative">
        <SlOptions onClick={() => setShow(prev => !prev)} color="gray" />
        {show && (
          <span className="absolute top-[3vh] right-0 text-red-400 p-3 border-2 bg-white border-red-400 min-w-[100px] rounded-sm text-center flex items-center uppercase font-bold text-xs gap-3">
            <p className="tracking-wide">Remove</p>
            <BsFillTrashFill size={17} />
          </span>
        )}
      </span>
    </div>
  );
};
export default ChatHead;
