import { BiUserPlus } from "react-icons/bi";
import { getColor } from "@/Utils/getColor";
import Image from "next/image";
import axios from "axios";

const SearchResults = ({
  firstName,
  lastName,
  username,
  image,
  id,
  setSearch,
}) => {
  const addFriend = () => {
    axios
      .post(`http://localhost:3000/api/chats/create-chat`, { friend: id })
      .then((res) => {
        setSearch("");
        alert(res.data.msg);
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };
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
            className="w-[100%] h-[100%]"
          />
        ) : (
          <p className="text-gray-700 font-bold">
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
export default SearchResults;
