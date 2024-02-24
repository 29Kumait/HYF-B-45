import moment from "moment";

export const formatMessage = (userName, text, pic, room) => {
  const formattedTime = moment().tz("Europe/Amsterdam").format("HH:mm a");
  return {
    userName,
    text,
    pic,
    room,
    time: formattedTime,
  };
};

export default formatMessage;
