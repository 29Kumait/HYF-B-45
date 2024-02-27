import React from "react";
import PropTypes from "prop-types";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, oldMessages, endRef, deleteMessage }) => {
  return (
    <ul className="message-list">
      {oldMessages.map((message, index) => (
        <MessageItem
          key={`old-${index}`}
          message={message}
          deleteMessage={deleteMessage}
        />
      ))}
      {messages.map((message, index) => (
        <MessageItem
          key={`new-${index}`}
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
  oldMessages: PropTypes.arrayOf(PropTypes.object), // Not marked as required
  endRef: PropTypes.object, // Not marked as required
  deleteMessage: PropTypes.func.isRequired,
};

MessageList.defaultProps = {
  oldMessages: [],
  endRef: () => {},
};

export default MessageList;
