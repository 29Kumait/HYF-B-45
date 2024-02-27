import React from "react";
import PropTypes from "prop-types";

const MessageForm = ({ currentMessage, setCurrentMessage, sendMessage }) => (
  <form onSubmit={sendMessage} className="message-form">
    <input
      type="text"
      value={currentMessage}
      onChange={(e) => setCurrentMessage(e.target.value)}
      placeholder="Type a message..."
      className="message-input"
    />
    <button type="submit" className="send-button">
      Send
    </button>
  </form>
);

MessageForm.propTypes = {
  currentMessage: PropTypes.string.isRequired,
  setCurrentMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default MessageForm;
