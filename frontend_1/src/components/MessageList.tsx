import React, { useState, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  avatar?: string; // User avatar URL (optional)
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string; // Unique identifier for the current user
}

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // Default user avatar

const COLORS = ["text-red-500", "text-blue-500", "text-green-500", "text-yellow-500", "text-purple-500", "text-pink-500", "text-orange-500", "text-teal-500"];

const getUserColor = (id: string, userColorMap: Record<string, string>) => {
  if (!userColorMap[id]) {
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    userColorMap[id] = COLORS[hash % COLORS.length];
  }
  return userColorMap[id];
};

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  const [userColorMap, setUserColorMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const newUserColors = { ...userColorMap };
    messages.forEach((msg) => {
      getUserColor(msg.id, newUserColors);
    });
    setUserColorMap(newUserColors);
  }, [messages]);

  return (
    <div className="space-y-3 mb-4 flex flex-col">
      {messages.map((msg, index) => {
        const isCurrentUser = msg.id === currentUserId;
        return (
          <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg max-w-xs ${isCurrentUser ? 'self-end flex-row-reverse' : 'self-start'}`}>
            <img src={msg.avatar || DEFAULT_AVATAR} alt="User Avatar" className="w-10 h-10 rounded-full border border-gray-300" />
            <div className={`flex flex-col text-sm p-3 rounded-lg max-w-xs ${isCurrentUser ? 'bg-blue-500 text-white self-end' : 'bg-gray-600 text-white self-start'}`}>
              <strong className={`${userColorMap[msg.id] || 'text-white'} text-xs`}>{isCurrentUser ? 'Me' : msg.id}</strong>
              <span className="text-gray-100">{msg.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
