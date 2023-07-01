import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const CheckUnreadMessages = (messages) => {
  const payload = jwt.verify(
    cookies().get("tjw").value,
    process.env.JWT_SECRET
  );

  const unreadMessages = messages.filter((msg) => {
    return msg.user_id !== Number(payload.user_id) && msg.viewed;
  });

  return unreadMessages;
};
export default CheckUnreadMessages;
