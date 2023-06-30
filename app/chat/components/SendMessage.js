"use client";

import { MdSend } from "react-icons/md";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import UseSubmit from "@/hooks/useSubmit";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState({ loading: false, data: null });
  const { sendMessage } = UseSubmit()

  useEffect(() => {
    if (message) {
      return setDisabled(false);
    }

    setDisabled(true);
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage({message, setData})
  };

  return (
    <form className="fixed bottom-0 bg-white w-[100vw] flex items-center border border-purple-500 rounded-2xl">
      <textarea
        placeholder="Send a message..."
        className="p-4 w-[90vw] max-h-[8vh] outline-none text-gray-700"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" disabled={disabled || data.loading} onClick={handleSubmit}>
        {data.loading ? (
          <CircularProgress size={25} className="w-[4vw]" color="inherit" />
        ) : (
          <MdSend color={disabled ? "gray" : "purple"} size={25} />
        )}
      </button>
    </form>
  );
};
export default SendMessage;
