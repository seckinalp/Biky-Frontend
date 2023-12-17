// ChattingComponent.tsx
import React from 'react';
import './ChattingComponent.css';
import { messageSendRequest } from './ChatMessageRow';
import { getUserCredentials } from '../logic/cookie';

type ChattingComponentProps = {
  messages: messageSendRequest[];
};

const ChattingComponent: React.FC<ChattingComponentProps> = ({ messages }) => {
  const us = getUserCredentials().userID;
  return (
    <div className="chat-box">
      {messages.map((message) => (
        <div 
          key={message.messageID} 
          className={`chat-message ${message.senderID === us ? 'right' : 'left'}`}
        >
          <div className="message-content">{message.content}</div>
          <div className="message-timestamp">{message.dateTime}</div>
        </div>
      ))}
    </div>
  );
};

export default ChattingComponent;
