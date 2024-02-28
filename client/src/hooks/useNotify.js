import { useState, useEffect, useCallback } from "react";
import useSocket from "./useSocket";

const useNotify = () => {
  const [notifications, setNotifications] = useState([]);
  const { socket } = useSocket(process.env.BASE_SERVER_URL);

  const playBeep = useCallback(() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start(); // Start beep
    oscillator.stop(audioCtx.currentTime + 0.2); //seconds
  }, []);

  useEffect(() => {
    if (socket) {
      const handleNewTextMessage = (message) => {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          message,
        ]);
        playBeep();
      };

      socket.on("newTextMessage", handleNewTextMessage);

      return () => {
        socket.off("newTextMessage", handleNewTextMessage);
      };
    }
  }, [socket, playBeep]);

  const addNotification = useCallback(
    (notification) => {
      setNotifications((prev) => [...prev, notification]);
      playBeep();
    },
    [playBeep]
  );

  const clearNotifications = () => setNotifications([]);
  return { notifications, addNotification, clearNotifications };
};

export default useNotify;
