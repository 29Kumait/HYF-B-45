// utils.jsx
import moment from "moment";

export const formatTimestamp = (timestamp) => {
  return moment(timestamp).fromNow();
};
