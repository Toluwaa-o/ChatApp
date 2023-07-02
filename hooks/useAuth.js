import axios from "axios";
import { deleteCookie } from "cookies-next";
import { useContext } from "react";
import { AuthenticationContext } from "../app/context/AuthContext";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();
  const { setAuthState } = useContext(AuthenticationContext);

  const signin = async ({ email, password, fromComponent }) => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signin", {
        email,
        password,
      });
      setAuthState({ data: res.data, error: null, loading: false });
      if (fromComponent) {
        router.refresh();
      } else {
        router.push("/chat");
      }
    } catch (err) {
      setAuthState({
        data: null,
        error: err.response.data.msg,
        loading: false,
      });
    }
  };

  const signup = async ({
    email,
    password,
    firstName,
    lastName,
    username,
    setShowImageSection,
  }) => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", {
        email,
        password,
        firstName,
        lastName,
        username,
      });

      setAuthState({ data: res.data, error: null, loading: false });
      setShowImageSection(true);
      // router.push("/chat");
    } catch (err) {
      setAuthState({
        data: null,
        error: err.response.data.msg,
        loading: false,
      });
    }
  };

  const signout = async () => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      await axios.get("http://localhost:3000/api/auth/signout");
      setAuthState({ data: null, error: null, loading: false });
    } catch (err) {
      setAuthState({
        data: null,
        error: err.response.data.msg,
        loading: false,
      });
    }
  };

  return { signin, signout, signup };
};

export default useAuth;
