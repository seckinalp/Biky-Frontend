import React, { useState } from 'react';
import './Chat.css'; // Make sure to create a corresponding CSS file
import ChatMessages from './ChatMessages';
import ChattingComponent from './ChattingComponent';

interface IMessage {
  messageID: number;
  senderID: string;
  receiverID: string;
  content: string;
  dateTime: string;
}
const messageData = [
  {
    profileImage: 'url-to-image-1.jpg',
    nickname: 'Alice Johnson',
    lastMessage: 'Hey, are you free to talk?',
    userID: '1',
  },
  {
    profileImage: 'url-to-image-2.jpg', // Changed 'profilePhoto' to 'profileImage'
    nickname: 'Charlie Smith', // Changed 'name' to 'nickname'
    lastMessage: 'Meeting got rescheduled to 3 pm.',
    userID: '2',
  },
  // ... more message data
];

const messageData2Initial = [
  {
      messageID: 1,
      senderID: 'us',
      receiverID: 'them',
      content: "hi",
      dateTime: "15:00",
  },
  {
      messageID: 2,
      senderID: 'them',
      receiverID: 'us',
      content: "hi too",
      dateTime: "15:15",
  },
  // ... more message data
];
interface IChatProps {
  onClose: () => void;
}
const Chat: React.FC<IChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUserID, setSelectedUserID] = useState<string | null>(null);
  const [messageData2, setMessageData2] = useState<IMessage[]>(messageData2Initial); 
  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUserID) {
      const dateTime = new Date().toLocaleTimeString();
      const newMsg: IMessage = {
        messageID: messages.length + 1, // simplistic ID assignment
        senderID: 'us', // Assuming 'me' is the current user's ID
        receiverID: 'them', // The ID of the user selected from the row
        content: newMessage,
        dateTime,
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      setMessageData2([...messageData2, newMsg]);
    }
  };

  const handleRowClick = (userID: string) => {
    setSelectedUserID(userID);
  };
  return (
    <div className='chat-main-container' >
   <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Room</h2>
      </div>
      <div className="chat-header2">
        <h2>{selectedUserID}</h2>
      </div>
      <div className="chat-messages">
      <ChattingComponent messages={messageData2} />
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
   
    <br />
      <div className='chat-messages-box'>
    <ChatMessages messageData= {messageData} onRowClick={handleRowClick} />
    
    </div>
  
    </div>
 
  );
};

export default Chat;
