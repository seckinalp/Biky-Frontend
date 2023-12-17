// ChatMessageRow.tsx
import React from 'react';
import './ChatMessageRow.css';

export type MessageRowProps = {
    profileImage: string;
    nickname: string;
    lastMessage: string;
    userID: string;
  };
  
  const ChatMessageRow: React.FC<MessageRowProps & { onClick: () => void, isSelected: boolean }> = ({
    profileImage,
    nickname,
    lastMessage,
    userID,
    onClick,
    isSelected,
}) => {
    const rowClass = isSelected ? "chat-message-row selected" : "chat-message-row";
    return (
        <div className={rowClass} onClick={onClick}>
            <img src={profileImage} alt={`${nickname}'s profile`} className="profile-photo" />
            <div className="message-info">
                <div className="name">{nickname}</div>
                <div className="last-message">{lastMessage}</div>
            </div>
        </div>
    );
};

export default ChatMessageRow;