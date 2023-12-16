import React from "react";
import { useNavigate } from 'react-router-dom';

import "./Navbar.css";

interface NavbarProps {
  onSettingsClick: () => void;
  onNotificationsClick :() => void;
  onProfileClick: () => void; 
  onCreatePostClick: () => void;
  onCategoryFilterClick:() => void;
  onSearchClick :() =>void;
  onChatClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onChatClick, onSearchClick , onCategoryFilterClick,onSettingsClick, onNotificationsClick, onProfileClick,onCreatePostClick }) => {

  const navigate = useNavigate();

  const handleProfileClick = () => {
    onProfileClick ();
  };

  const handleChatClick = () => {
    onChatClick();
  };

  const handleNotificationClick = () => {
    onNotificationsClick(); 
  };

  const handleSettingsClick = () => {
    onSettingsClick(); 
  };

  const handleHomeClick = () => {
    navigate("/posts")
    // Ana sayfa düğmesi tıklama olayını burada işleyin
  };
  const handleCreateClick = () => {
    onCreatePostClick();
  };

  const handleSearchClick = () => {
    onSearchClick ();
  };
  const handleFilterClick = () => {
    onCategoryFilterClick();
  };
  return (
    <div className="navbar">
      <div className="navbar__rectangle"></div>
      
      <div className="navbar__left">
        
        <img className="navbar__bikylogo" src="../../siyaharkaplansiz.png" alt="" />
        
      
        <button className="navbar__button navbar__button_profile" onClick={handleProfileClick}>
          <img className="navbar__profile" src="../../profile.png" alt="" />
        </button>
        <button className="navbar__button navbar__button_home" onClick={handleHomeClick}>
          <img className="navbar__home" src="../../home-buttonn.png" alt="" />
        </button>
        <button className="navbar__button navbar__button_message" onClick={handleChatClick}>
          <img className="navbar__message" src="../../message.png" alt="" />
        </button>
        <button className="navbar__button navbar__button_notification" onClick={handleNotificationClick}>
          <img className="navbar__notification" src="../../notification.png" alt="" />
        </button>
        <button className="navbar__button navbar__button_settings" onClick={handleSettingsClick}>
          <img className="navbar__settings" src="../../settings.png" alt="" />
        </button>
      
      </div>
      <div className="navbar__middle">

        <button className="navbar__button navbar__button_create" onClick={handleCreateClick}>
          <img className="navbar__create" src="../../create.png" alt="" />
        </button>
       
      </div>
      <div className="navbar__right">
        
      <button className="navbar__button navbar__button_filter" onClick={handleFilterClick}>
          <img className="navbar__filter" src="../../filter-button.png" alt="" />
        </button>

        
        <button className="navbar__button navbar__button_search" onClick={handleSearchClick}>
          <img className="navbar__search" src="../../search-button.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;