import moment from "moment";

const GetTime = ({ messages, createdAt }) => {
  const currentTime = moment(new Date().toISOString());
  const createdTime = moment(createdAt);
  const oneDay = 24 * 3600000;

  if (messages.length) {
    if (
      currentTime.diff(moment(messages[messages.length - 1].createdAt)) >=
      oneDay
    ) {
      return moment(messages[messages.length - 1].createdAt).format("ddd");
    }
    return moment(messages[messages.length - 1].createdAt).format("h:mm a");
  }

  if (currentTime.diff(createdTime) >= oneDay) {
    return moment(createdAt).format("ddd");
  }

  return moment(createdAt).format("h:mm a");
};
export default GetTime;
