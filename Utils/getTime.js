import moment from "moment";

const GetTime = ({ messages, createdAt }) => {
  if (messages.length) {
    return moment(messages[messages.length - 1].createdAt).fromNow();
  }

  return moment(createdAt).fromNow();
};
export default GetTime;
