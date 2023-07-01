import Link from "next/link";
import { BiUserPlus, BiUserCheck } from "react-icons/bi";
import { getColor } from "@/Utils/getColor";
import Image from "next/image";

const CheckFriends = ({
  firstName,
  lastName,
  username,
  image,
  friend,
  chatId,
  addFriend,
}) => {
  if (friend) {
    return (
      <Link
        href={`/chat/${chatId}`}
        className="flex gap-4 p-3 items-center w-[100%]"
      >
        <span
          className={`rounded-full grid place-content-center ${getColor()} w-[40px] h-[40px] relative`}
        >
          {image ? (
            <Image
              src={image}
              alt={username}
              width={30}
              height={30}
              className="w-[100%] h-[100%] rounded-full"
            />
          ) : (
            <p className="text-gray-700 font-bold rounded-full">
              {firstName.charAt(0)}
              {lastName.charAt(0)}
            </p>
          )}
          <span className="w-[13px] h-[13px] bg-green-400 rounded-full absolute bottom-0 right-0"></span>
        </span>
        <span>
          <h4>
            {firstName} {lastName}
          </h4>
          <p className="text-sm text-gray-600 capitalize">{username}</p>
        </span>
        <span className="ml-auto">
          <BiUserCheck color="green" size={25} />
        </span>
      </Link>
    );
  }
  return (
    <div className="flex gap-4 p-3 items-center w-[100%]">
      <span
        className={`rounded-full grid place-content-center ${getColor()} w-[40px] h-[40px] relative`}
      >
        {image ? (
          <Image
            src={image}
            alt={username}
            width={30}
            height={30}
            className="w-[100%] h-[100%] rounded-full"
          />
        ) : (
          <p className="text-gray-700 font-bold rounded-full">
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </p>
        )}
        <span className="w-[13px] h-[13px] bg-green-400 rounded-full absolute bottom-0 right-0"></span>
      </span>
      <span>
        <h4>
          {firstName} {lastName}
        </h4>
        <p className="text-sm text-gray-600 capitalize">{username}</p>
      </span>
      <span className="ml-auto" onClick={addFriend}>
        <BiUserPlus color="purple" size={25} />
      </span>
    </div>
  );
};
export default CheckFriends;
