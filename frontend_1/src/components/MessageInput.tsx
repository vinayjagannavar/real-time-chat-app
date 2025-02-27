import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t bg-white dark:bg-gray-900">
      <input
        type="text"
        value={message}
        placeholder="Type a message..."
        className="flex-1 p-3 bg-gray-200 dark:bg-gray-700 border rounded-full text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        className="p-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition dark:bg-indigo-500 dark:hover:bg-indigo-600"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
