import React from "react";
import { useNavigate, Link } from 'react-router-dom';

import "./Navbar.css";

interface NavbarProps {
  handleCreateClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleCreateClick }) => {

  const navigate = useNavigate();

  const handleProfileClick = () => {
    // Profil düğmesi tıklama olayını burada işleyin
  };

  const handleMessageClick = () => {
    // Mesaj düğmesi tıklama olayını burada işleyin
  };

  const handleNotificationClick = () => {
    // Bildirim düğmesi tıklama olayını burada işleyin
  };

  const handleSettingsClick = () => {
    // Ayarlar düğmesi tıklama olayını burada işleyin
  };

  const handleHomeClick = () => {
    navigate("/posts")
    // Ana sayfa düğmesi tıklama olayını burada işleyin
  };

  const handleStoreClick = () => {
    // Mağaza düğmesi tıklama olayını burada işleyin
  };

  return (
    <div className="navbar">
      <div className="navbar__rectangle"></div>
      <img className="navbar__bikylogo" src="../../public/siyaharkaplansiz.png" alt="" />
      <div className="navbar__left">
        <button className="navbar__button navbar__button_profile" onClick={handleProfileClick}>
          <img className="navbar__profile" src="../../public/profile.png" alt="" />
        </button>
        <button className="navbar__button navbar__button_message" onClick={handleMessageClick}>
          <img className="navbar__message" src="../../public/message.png" alt="" />
        </button>
        <button className="navbar__button navbar__button_notification" onClick={handleNotificationClick}>
          <img className="navbar__notification" src="../../public/notification.png" alt="" />
        </button>
        <button className="navbar__button navbar__button_settings" onClick={handleSettingsClick}>
          <img className="navbar__settings" src="../../public/settings.png" alt="" />
        </button>
      </div>
      <div className="navbar__middle">
        <button className="navbar__button navbar__button_home" onClick={handleHomeClick}>
          <img className="navbar__home" src="../../public/homedark.png" alt="" />
        </button>
        <button className="navbar__button navbar__button_create" onClick={handleCreateClick}>
          <img className="navbar__create" src="../../public/create.png" alt="" />
        </button>
        <button className="navbar__button navbar__button_store" onClick={handleStoreClick}>
          <img className="navbar__store" src="../../public/storelight.png" alt="" />
        </button>
      </div>
      <div className="navbar__right"></div>
    </div>
  );
};

export default Navbar;