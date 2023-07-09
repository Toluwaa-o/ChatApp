import CheckFriends from "@/libs/checkFriends";
import { useRouter } from "next/navigation";
import instance from "@/app/components/axios/config";

const SearchResults = (props) => {
  const router = useRouter();

  const addFriend = () => {
    instance
      .post(`/chats/create-chat`, { friend: props.id })
      .then((res) => {
        props.setSearch("");
        router.refresh();
        alert(res.data.msg);
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  return <CheckFriends {...props} addFriend={addFriend} />;
};
export default SearchResults;
