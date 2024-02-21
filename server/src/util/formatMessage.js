import moment from "moment";

export const formatMessage = (userName, text) => {
  const formattedTime = moment().format("HH:mm a");
  return {
    userName,
    text,
    time: formattedTime,
  };
};

export default formatMessage;
