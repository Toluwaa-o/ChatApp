import instance from "@/app/components/axios/config";
import { useRouter } from "next/navigation";

const UseSubmit = () => {
  const router = useRouter();
  const sendMessage = async ({ message, setData, id, setMessage }) => {
    setData({ loading: true, data: null });
    try {
      await instance.post(`/messages/send-message?chat=${id}`, { message });
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
