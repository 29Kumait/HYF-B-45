import React from "react";
import PropTypes from "prop-types";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, oldMessages, endRef, deleteMessage }) => {
  return (
    <ul className="message-list">
      {oldMessages.concat(messages).map((message, index) => (
        <MessageItem
          key={message._id ? `message-${message._id}` : `index-${index}`}
          message={message}
          deleteMessage={deleteMessage}
        />
      ))}
      <div ref={endRef} />
    </ul>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  oldMessages: PropTypes.arrayOf(PropTypes.object).isRequired,
  endRef: PropTypes.object.isRequired,
  deleteMessage: PropTypes.func.isRequired,
};

MessageList.defaultProps = {
  oldMessages: [],
  endRef: () => {},
};

export default MessageList;
