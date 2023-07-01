"use client";

import Link from "next/link";
import checkAuthMode from "@/Utils/CheckAuthMode";
import Inputs from "./Inputs";
import Logo from "./Logo";
import { useState, useContext, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthenticationContext } from "../context/AuthContext";
import Alert from "@mui/material/Alert";
import ImageUpload from "./ImageUpload";

const AuthInputs = ({ isSignIn, fromComponent }) => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
  });

  const { error, loading, setAuthState } = useContext(AuthenticationContext);

  const { signin, signup, signout } = useAuth();
  const [showImageSection, setShowImageSection] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    const { email, password, username, fullName } = data;
    if (isSignIn) {
      if (email && password) return setDisabled(false);
      else return setDisabled(true);
    } else {
      if (email && password && username && fullName) return setDisabled(false);
      else return setDisabled(true);
    }
  }, [data]);

  // useEffect(() => {
  //   if (loading) {
  //     return setDisabled(true);
  //   }
  //   return setDisabled(false);
  // }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignIn) {
      const { email, password } = data;
      return signin({ email, password, fromComponent });
    } else {
      const { email, password, fullName, username } = data;

      if (fullName.split(" ").length < 2) {
        return setAuthState({
          error: "Please provide your full name",
          loading: false,
          data: null,
        });
      }
      const [firstName, lastName] = fullName.split(" ");
      return signup({
        email,
        password,
        firstName,
        lastName,
        username,
        setShowImageSection,
      });
    }
  };

  return (
    <>
      {error && (
        <Alert className="items-center text-lg" severity="error">
          {error}
        </Alert>
      )}
      {!showImageSection ? (
        <div className="bg-purple-100 min-h-screen grid place-content-center gap-8 md:gap-5 overflow-x-hidden p-4">
          <Logo />

          <div className="text-center mt-5 md:mt-1">
            <h1 className="text-2xl font-bold text-gray-700 md:text-3xl md:pb-2">
              {checkAuthMode({
                isSignIn,
                signin: "Sign in",
                signup: "Sign Up",
              })}
            </h1>
            <p className="text-gray-500 font-medium md:text-lg">
              {checkAuthMode({
                isSignIn,
                signin: "Sign in to continue to ChatApp",
                signup: "Get your ChatApp account now",
              })}
            </p>
          </div>

          <form
            className="bg-white p-7 md:rounded-lg flex flex-col gap-2 w-screen max-w-[450px]"
            onSubmit={handleSubmit}
          >
            {!isSignIn && (
              <div className="flex flex-col gap-2">
                <Inputs
                  type="text"
                  text="Full Name"
                  name="fullName"
                  placeholder="Enter your Full Name"
                  onChange={handleChange}
                  value={data.fullName}
                />
                <Inputs
                  type="text"
                  text="Username"
                  name="username"
                  placeholder="Enter your Username"
                  onChange={handleChange}
                  value={data.username}
                />
              </div>
            )}
            <Inputs
              type="email"
              text="Email"
              name="email"
              placeholder="Enter your Email"
              onChange={handleChange}
              value={data.email}
            />
            <Inputs
              type="password"
              text="Password"
              name="password"
              placeholder="Enter your Password"
              onChange={handleChange}
              value={data.password}
            />

            <span
              className={
                disabled
                  ? `bg-gray-400 rounded-lg mt-4`
                  : `bg-green-500 rounded-lg mt-4`
              }
            >
              <button
                type="submit"
                disabled={disabled}
                className="bg-green-500 text-white uppercase tracking-wide text-center font-bold py-4 rounded-lg md:text-lg disabled:bg-gray-400 text-md grid place-content-center w-[100%]"
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  checkAuthMode({
                    isSignIn,
                    signin: "Login",
                    signup: "Sign Up",
                  })
                )}
              </button>
            </span>
          </form>

          <p className="text-center text-lg">
            {!isSignIn ? "Already have an account?" : "Don't have an account?"}{" "}
            {!isSignIn ? (
              <Link className="text-purple-700 font-bold" href="/login">
                Login
              </Link>
            ) : (
              <Link className="text-purple-700 font-bold" href="/signup">
                Sign Up
              </Link>
            )}
          </p>
        </div>
      ) : (
        <ImageUpload />
      )}
    </>
  );
};
export default AuthInputs;
