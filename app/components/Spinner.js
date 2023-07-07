"use client";
import CircularProgress from "@mui/material/CircularProgress";

export default function Spinner() {
  return (
    <div className="grid gap-4 place-content-center h-screen w-screen">
      <CircularProgress className="m-auto" size={70} color="secondary" />
      <p className="text-purple-700 font-semibold tracking-widest">
        Loading...
      </p>
    </div>
  );
}
