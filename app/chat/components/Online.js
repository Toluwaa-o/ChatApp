import { getColor } from "@/Utils/getColor";
import Link from "next/link";

const Online = ({ isNotOnlineBar }) => {
  if (isNotOnlineBar) {
    return (
      <span
        className={`rounded-full grid place-content-center ${getColor()} w-[50px] h-[50px] relative`}
      >
        <p className="text-gray-700 font-bold">FN</p>
        <span className="w-[13px] h-[13px] bg-green-400 rounded-full absolute bottom-0 right-0"></span>
      </span>
    );
  }
  return (
    <Link
      href="/chat/idd"
      className={`rounded-full grid place-content-center ${getColor()} w-[50px] h-[50px] relative`}
    >
      <p className="text-gray-700 font-bold">FN</p>
      <span className="w-[13px] h-[13px] bg-green-400 rounded-full absolute bottom-0 right-0"></span>
    </Link>
  );
};
export default Online;
