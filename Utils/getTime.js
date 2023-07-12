import moment from "moment";

const GetTime = ({ messages, createdAt }) => {
  const currentTime = moment(new Date().toISOString());
  const createdTime = moment(createdAt);
  const oneDay = 24 * 3600000;
  const oneWeek = oneDay * 7;
  const oneYear = oneDay * 365;

  if (messages.length) {
    if (
      currentTime.diff(moment(messages[messages.length - 1].createdAt)) >=
      oneDay
    ) {
      return moment(messages[messages.length - 1].createdAt).format("ddd");
    }

    if (
      currentTime.diff(moment(messages[messages.length - 1].createdAt)) >=
      oneWeek
    ) {
      return moment(messages[messages.length - 1].createdAt).format("DD/MM");
    }

    if (
      currentTime.diff(moment(messages[messages.length - 1].createdAt)) >=
      oneYear
    ) {
      return moment(messages[messages.length - 1].createdAt).format("D/M/YY");
    }

    return moment(messages[messages.length - 1].createdAt).format("h:mm a");
  }

  if (currentTime.diff(createdTime) >= oneDay) {
    return moment(createdAt).format("ddd");
  }

  if (currentTime.diff(createdTime) >= oneWeek) {
    return moment(createdAt).format("DD/MM");
  }

  if (currentTime.diff(createdTime) >= oneYear) {
    return moment(createdAt).format("D/M/YY");
  }

  return moment(createdAt).format("h:mm a");
};
export default GetTime;
