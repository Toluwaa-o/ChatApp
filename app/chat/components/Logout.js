"use client";

import { BiLogOut } from "react-icons/bi";
import useAuth from "@/hooks/useAuth";

const Logout = () => {
  const { signout } = useAuth();

  return <BiLogOut onClick={() => signout()} color="orangered" size={28} />;
};
export default Logout;
