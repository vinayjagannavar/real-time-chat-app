"use client";

import React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ConnectionStatus from "./ConnectionStatus";

const socket = io("http://localhost:8000", {
  path: "/socket.io/",
  transports: ["websocket"],
});

interface Message {
  id: string;
  text: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  useEffect(() => {
    socket.on("connect", () => setConnectionStatus("Connected"));
    socket.on("disconnect", () => setConnectionStatus("Disconnected"));
    socket.on("message", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

  const sendMessage = (message: string) => {
    if (message.trim()) {
      socket.emit("message", message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 flex flex-col h-[80vh]">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">Real-Time Chat</h1>
        <ConnectionStatus status={connectionStatus} />
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 shadow-inner">
          <MessageList messages={messages} />
        </div>
        <div className="mt-4">
          <MessageInput onSendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
