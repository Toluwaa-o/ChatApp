"use client";

import { AuthenticationContext } from "../context/AuthContext";
import { useState, useContext } from "react";
import { RxAvatar } from "react-icons/rx";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@uploadthing/react";
import { memo } from "react";
import Image from "next/image";
import Logo from "./Logo";
import Link from "next/link";
import instance from "./axios/config";

const ImageUploader = () => {
  const { setAuthState } = useContext(AuthenticationContext);

  const [image, setImage] = useState([]);

  return (
    <>
      <div className="bg-purple-100 h-screen grid place-content-center gap-8 md:gap-5 overflow-hidden">
        <Logo />

        <div className="text-center mt-5 md:mt-1">
          <h1 className="text-2xl font-bold text-gray-700 md:text-3xl md:pb-2">
            Sign Up
          </h1>
        </div>
        <div className="bg-white p-7 md:rounded-lg flex flex-col gap-2 w-screen max-w-[450px]">
          <h3 className="text-center text-gray-500 font-bold">
            Add Profile Picture
          </h3>
          <span className="m-auto grid place-content-center gap-4">
            {image.length ? (
              <Image
                src={image[0].fileUrl}
                alt="Profile picture"
                width={100}
                height={100}
                className="rounded-full w-[100px] h-[100px] m-auto"
              />
            ) : (
              <RxAvatar
                size={100}
                color="gray"
                className="rounded-full m-auto"
              />
            )}
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                instance
                  .post("/image", {
                    image: res[0].fileUrl,
                  })
                  .then(() => setImage(res));
              }}
              onUploadError={(err) => {
                setAuthState({
                  data: null,
                  loading: false,
                  error: err.message,
                });
              }}
            />
          </span>
          <Link
            href="/chat"
            className="bg-green-500 text-center text-white uppercase tracking-wide font-bold py-4 rounded-lg mt-4 md:text-lg disabled:bg-gray-400 h-16 text-lg"
          >
            Done
          </Link>
        </div>
      </div>
    </>
  );
};

export default memo(ImageUploader);
