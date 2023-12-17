// ChattingComponent.tsx
import React from 'react';
import './ChattingComponent.css'; // Make sure to create this CSS file
export interface IMessage {
  messageID: number;
  senderID: string;
  receiverID: string;
  content: string;
  dateTime: string;
}// Import the IMessage interface

type ChattingComponentProps = {
  messages: IMessage[];
};

const ChattingComponent: React.FC<ChattingComponentProps> = ({ messages }) => {
  return (
    <div className="chat-box">
      {messages.map((message) => (
        <div 
          key={message.messageID} 
          className={`chat-message ${message.receiverID === 'them' ? 'right' : 'left'}`}
        >
          <div className="message-content">{message.content}</div>
          <div className="message-timestamp">{message.dateTime}</div>
        </div>
      ))}
    </div>
  );
};

export default ChattingComponent;
