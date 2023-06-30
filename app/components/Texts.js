import Illustration from "../../public/undraw_chatting_re_j55r.svg";
import Image from "next/image";
import Link from "next/link";

const Texts = () => {
  return (
    <>
      <div className="p-4 flex flex-col gap-4 text-center md:text-left">
        <h1 className="md:text-7xl text-3xl md:leading-tight">
          It's easy talking to your friends with{" "}
          <span className="font-bold">
            Chat<span className="text-purple-950">App</span>
          </span>
        </h1>

        <p className="md:text-xl text-gray-500 md:font-normal text-base">
          Start conversations, Connect with your friends on the go, and never
          miss a moment with ChatApp. Communicate with everyone, from family to
          friends with the push of a button!
        </p>
        <Link
          href="/chat"
          className="m-auto md:m-0 rounded-3xl font-bold px-5 py-2 hover:text-purple-950  hover:bg-white md:px-8 md:py-3 w-fit h-fit bg-purple-950 text-white md:font-bold md:tracking-wide uppercase center border border-purple-950 duration-300"
        >
          Get Started
        </Link>
      </div>

      <Image className="mt-8 w-2/3 md:w-full" src={Illustration} alt='Chat Illustration' />
    </>
  );
};
export default Texts;
