import Link from "next/link";
import { BsChatSquareHeartFill } from "react-icons/bs";

const Logo = () => {
  return (
    <Link href="/" className="m-auto flex items-center gap-2">
      <BsChatSquareHeartFill color="purple" size={40} />
      <p className="font-bold md:font-extrabold text-2xl md:text-3xl">
        Chat<span className="text-purple-950">App</span>
      </p>
    </Link>
  );
};

export default Logo;
