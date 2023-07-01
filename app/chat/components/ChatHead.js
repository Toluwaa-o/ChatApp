"use client";

import { getColor } from "@/Utils/getColor";
import { SlOptions } from "react-icons/sl";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ChatHead = ({ firstName, lastName, image, id, online }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  return (
    <div className="flex gap-4 items-center p-3 bg-purple-100 fixed top-0 w-[100vw]">
      <IoIosArrowBack onClick={() => router.push("/chat")} />
      <span
        className={`rounded-full grid place-content-center ${getColor()} w-[40px] h-[40px] relative border border-white`}
      >
        {image ? (
          <Image
            src={image}
            alt={`${firstName} ${lastName}`}
            width={33}
            height={33}
            className="w-[100%] h-[100%] rounded-full"
          />
        ) : (
          <p className="text-gray-700 font-bold">FN</p>
        )}
        {online && (
          <span className="w-[13px] h-[13px] bg-green-400 rounded-full absolute bottom-0 right-0"></span>
        )}
      </span>
      <h2 className="text-gray-500 font-medium tracking-wider">
        {firstName} {lastName}
      </h2>
      <span className="ml-auto relative">
        <SlOptions onClick={() => setShow((prev) => !prev)} color="gray" />
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
