import React from "react";
import PropTypes from "prop-types";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, oldMessages, endRef }) => (
  <ul className="message-list">
    {oldMessages.map((message, index) => (
      <MessageItem key={`old-${index}`} message={message} />
    ))}
    {messages.map((message, index) => (
      <MessageItem key={`new-${index}`} message={message} />
    ))}
    <div ref={endRef} />
  </ul>
);

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  oldMessages: PropTypes.arrayOf(PropTypes.object).isRequired,
  endRef: PropTypes.object.isRequired,
};

export default MessageList;
