import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import "./Navbar.css";
import { GetUserPhoto, imageLink } from "../logic/backend";
import { getUserCredentials } from "../logic/cookie";

interface NavbarProps {
  onSettingsClick: () => void;
  onNotificationsClick :() => void;
  onProfileClick: () => void; 
  onCreatePostClick: () => void;
  onCategoryFilterClick:() => void;
  onSearchClick :() =>void;
  onChatClick: () => void;
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({onHomeClick, onChatClick, onSearchClick , onSettingsClick, onNotificationsClick, onProfileClick,onCreatePostClick }) => {

  

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
   
    onHomeClick();
  };
  const handleCreateClick = () => {
    onCreatePostClick();
  };

  const handleSearchClick = () => {
    onSearchClick ();
  };

  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const fetchUserPhoto = async () => {
      try {
        if(getUserCredentials().token !== "") {
        const result = await GetUserPhoto();
        console.log(result);
        setPhoto(result);
        }
      } catch (error) {
        console.error('Error fetching user photo:', error);
      }
    };

    fetchUserPhoto();
  }, []);
  return (
    <div className="navbar">
      <div className="navbar__rectangle"></div>
      
      <div className="navbar__left">
        
        <img className="navbar__bikylogo" src="../../siyaharkaplansiz.png" alt="" />
        
      
        <button className="navbar__button navbar__button_profile" onClick={handleProfileClick}>
          <img className="navbar__profile" src={photo == "" || photo == null ? "../../public/ppdefault.jpg" : `${imageLink}${photo}`} alt="" />
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
        
      

        
        <button className="navbar__button navbar__button_search" onClick={handleSearchClick}>
          <img className="navbar__search" src="../../search-button.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;