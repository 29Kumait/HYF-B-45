// ChatPage.jsx
import React from "react";
// import Chat from './components/Chat';
import Chat from "../../components/chat/Chat";
import Header from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";

const ChatPage = () => {
  return (
    <div>
      <Header />
      <Chat />
      <Footer />
    </div>
  );
};

export default ChatPage;
