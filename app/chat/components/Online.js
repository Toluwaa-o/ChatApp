import { getColor } from "@/Utils/getColor";
import Image from "next/image";
import Link from "next/link";

const Online = ({ isNotOnlineBar, image, firstName, lastName, online }) => {
  if (isNotOnlineBar) {
    return (
      <span
        className={`rounded-full grid place-content-center ${getColor()} w-[50px] h-[50px] relative`}
      >
        {image ? (
          <Image
            src={image}
            alt={`${firstName} ${lastName}`}
            width={35}
            height={35}
            className="w-[100%] h-[100%] rounded-full"
          />
        ) : (
          <p className="text-gray-700 font-bold capitalize">
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </p>
        )}
        {online && (
          <span className="w-[13px] h-[13px] bg-green-400 rounded-full absolute bottom-0 right-0"></span>
        )}
      </span>
    );
  }
  return (
    <Link
      href="/chat/idd"
      className={`rounded-full grid place-content-center ${getColor()} w-[50px] h-[50px] relative`}
    >
      {image ? (
        <Image
          src={image}
          alt={`${firstName} ${lastName}`}
          width={35}
          height={35}
          className="w-[100%] h-[100%] rounded-full"
        />
      ) : (
        <p className="text-gray-700 font-bold capitalize">
          {firstName.charAt(0)}
          {lastName.charAt(0)}
        </p>
      )}
      {online && (
        <span className="w-[13px] h-[13px] bg-green-400 rounded-full absolute bottom-0 right-0"></span>
      )}
    </Link>
  );
};
export default Online;
