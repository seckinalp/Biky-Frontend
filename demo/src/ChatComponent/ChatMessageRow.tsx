// ChatMessageRow.tsx
import React from 'react';
import './ChatMessageRow.css';
import { userSendRequest } from '../comment/Comment';
import { imageLink } from '../logic/backend';

export interface messageSendRequest {
    messageID: string,
    senderID: string,
    receiverID: string,
    content: string,
    dateTime: string
}

export type ChatSendRequest = {
    user: userSendRequest,
    lastMessage: messageSendRequest;
  };
  
  const ChatMessageRow: React.FC<ChatSendRequest & { onClick: () => void, isSelected: boolean }> = ({
    user,
    lastMessage,
    onClick,
    isSelected,
}) => {
    const rowClass = isSelected ? "chat-message-row selected" : "chat-message-row";
    return (
        <div className={rowClass} onClick={onClick}>
            <img src={user.profileImage == "" || user.profileImage == null ? "../../public/ppdefault.jpg" : `${imageLink}${user.profileImage}`} alt={`${user.nickname}'s profile`} className="profile-photo" />
            <div className="message-info">
                <div className="name">{user.nickname}</div>
                <div className="last-message">{lastMessage.content}</div>
            </div>
        </div>
    );
};

export default ChatMessageRow;