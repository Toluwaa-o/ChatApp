"use client"; // Error components must be Client Components

import { BiMessageAltError } from "react-icons/bi";

export default function Error({ error, reset }) {
  return (
    <div className="grid gap-4 place-content-center w-screen h-screen text-center p-4">
      <BiMessageAltError size={200} className="m-auto" color="purple" />
      <h2 className="text-gray-600 font-bold uppercase">
        Something went wrong!
      </h2>
      {error.message && (
        <p className="text-gray-600 font-medium">{error.message}</p>
      )}
      <button
        onClick={() => reset()}
        className="bg-red-400 text-white p-3 w-fit uppercase m-auto text-sm rounded-md font-bold tracking-wide"
      >
        Try again
      </button>
    </div>
  );
}
