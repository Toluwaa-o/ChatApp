import axios from "axios";
import { useRouter } from "next/navigation";

const UseSubmit = () => {
  const router = useRouter();
  const sendMessage = async ({ message, setData, id, setMessage }) => {
    setData({ loading: true, data: null });
    try {
      await axios.post(
        `https://chat-app-toluwaa-o.vercel.app/api/messages/send-message?chat=${id}`,
        { message }
      );
      setData({ loading: false, data: null });
      setMessage("");
      router.refresh();
    } catch (error) {
      setData({ loading: false, data: null });
    }
  };

  return { sendMessage };
};
export default UseSubmit;
