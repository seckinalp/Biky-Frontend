import React, { useState } from 'react';
import './Chat.css'; // Make sure to create a corresponding CSS file

interface IMessage {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const timestamp = new Date().toLocaleTimeString([], { timeStyle: 'short' });
      const newMsg: IMessage = {
        id: messages.length + 1, // simplistic ID assignment
        author: 'me', // in a real app, you would have user context to determine the author
        content: newMessage,
        timestamp,
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Room</h2>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`chat-message ${message.author === 'me' ? 'mine' : 'theirs'}`}>
            <div className="chat-message-content">{message.content}</div>
            <div className="chat-message-timestamp">{message.timestamp}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input-field"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage} className="chat-send-button">Send</button>
      </div>
    </div>
  );
};

export default Chat;
