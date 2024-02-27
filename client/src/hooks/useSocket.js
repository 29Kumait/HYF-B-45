import { useState, useEffect } from "react";
import io from "socket.io-client";

const useSocket = (url) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (!url) return;

    const newSocket = io(url);

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [url]);

  const emitEvent = (eventName, data) => {
    if (socket) {
      socket.emit(eventName, data);
    }
  };

  return { socket, emitEvent };
};

export default useSocket;
