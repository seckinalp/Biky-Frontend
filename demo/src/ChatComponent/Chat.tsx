import React, { useState } from 'react';
import './Chat.css';
interface ChatProps {
 
  onClose: () => void;
}
const Chat: React.FC<ChatProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true); // State ekleyin ve başlangıçta açık olsun

  const handleClose = () => {
   onClose(); // Kapatma işlemi için state'i false yapın
  };

  return (
    <div className={`chat-container ${isOpen ? 'open' : 'closed'}`}>
      <h1>Chat Uygulaması</h1>
      {isOpen && (
        <button className="close-button" onClick={handleClose}>Close</button>
      )}
      {/* Chat içeriği buraya eklenebilir */}
    </div>
  );
};

export default Chat;
