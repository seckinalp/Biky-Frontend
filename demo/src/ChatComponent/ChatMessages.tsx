// ChatMessages.tsx
import React, { useState } from 'react';
import ChatMessageRow, { MessageRowProps } from './ChatMessageRow';
import './ChatMessages.css';

type ChatMessagesProps = {
    messageData: MessageRowProps[];
    onRowClick: (userID: string) => void; // Function to handle row click
};

const ChatMessages: React.FC<ChatMessagesProps> = ({ messageData, onRowClick }) => {
    const [selectedUserID, setSelectedUserID] = useState<string | null>(null);

    const handleRowClick = (userID: string) => {
        setSelectedUserID(userID); // Update the selected user ID
        onRowClick(userID); // Call the provided onRowClick function
    };

    return (
        <div className="chat-messages">
            <div className="chat-messages-header">Messages</div>
            <div className='chat-messages-list'>
                {messageData.map((msg) => (
                    <ChatMessageRow
                        key={msg.userID}
                        profileImage={msg.profileImage}
                        nickname={msg.nickname}
                        lastMessage={msg.lastMessage}
                        userID={msg.userID}
                        onClick={() => handleRowClick(msg.userID)}
                        isSelected={msg.userID === selectedUserID} // Pass isSelected prop
                    />
                ))}
            </div>
        </div>
    );
};

export default ChatMessages;
