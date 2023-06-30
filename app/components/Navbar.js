"use client";

import { BsChatSquareHeartFill } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [display, setDisplay] = useState("hidden");

  return (
    <header className="p-4 md:py-4 md:px-8 flex justify-between">
      <span className="flex items-center gap-2">
        <BsChatSquareHeartFill color="purple" size={40} />
        <p className="font-bold md:font-extrabold text-lg md:text-2xl">
          Chat<span className="text-purple-950">App</span>
        </p>
      </span>

      <AiOutlineMenu
        className="md:hidden"
        size={30}
        onClick={() => setDisplay("flex")}
      />

      <nav
        className={`gap-4 text-lg font-medium ${display} fixed right-0 top-0 bg-purple-950 h-full w-2/3 flex flex-col p-8 gap-8 md:flex md:bg-transparent md:h-fit md:w-fit md:relative md:inset-0`}
      >
        <AiOutlineClose
          size={34}
          color="white"
          className="md:hidden ml-auto"
          width="35"
          onClick={() => setDisplay("hidden")}
        />
        <ul className="flex flex-col gap-5 md:flex-row">
          <li>
            <Link
              href="/login"
              className="items-center tracking-widest gap-4 uppercase flex md:rounded-3xl md:hover:text-purple-950  md:hover:bg-white md:px-8 md:h-fit md:bg-purple-950 text-white md:center md:py-1 md:border md:border-purple-950 duration-300"
            >
              <BiLogIn className="md:hidden" size={20} />
              Sign In
            </Link>
          </li>
          <li>
            <Link
              href="/signup"
              className="uppercase tracking-widest gap-4 flex items-center text-white md:rounded-3xl md:px-8 md:h-fit md:border md:border-purple-950 md:hover:bg-purple-950 md:hover:text-white duration-300 md:text-purple-950 md:center md:py-1"
            >
              <BiLogOut className="md:hidden" size={20} />
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
