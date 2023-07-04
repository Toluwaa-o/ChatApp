import axios from "axios";
import CheckFriends from "@/libs/checkFriends";
import { useRouter } from "next/navigation";

const SearchResults = (props) => {
  const router = useRouter();
    
  const addFriend = () => {
    axios
      .post(`http://localhost:3000/api/chats/create-chat`, { friend: props.id })
      .then((res) => {
        props.setSearch("");
        router.refresh()
        alert(res.data.msg);
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  return <CheckFriends {...props} addFriend={addFriend} />;
};
export default SearchResults;
