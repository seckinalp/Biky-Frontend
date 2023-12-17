import React, { ReactNode, useEffect, useState } from "react";
import "./Homepage.css";
import Navbar from "./navigation/Navbar";
import Settings from "./settingsComponent/Settings";
import Notifications from "./notificationComponent/Notifications";
import CreatePost from "./createPostComponent/CreatePost";
import SearchComponent from "./SearchComponent/SearchComponent";
import Chat from "./ChatComponent/Chat";
import { getUserCredentials } from "./logic/cookie";
import Feed from "./postcomponent/Feed";
import { useNavigate } from "react-router-dom";

type HomepageProps = {
  children: ReactNode;
};

const Homepage: React.FC<HomepageProps> = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkUserCredentials = () => {
      const userCredentials = getUserCredentials();
      if (userCredentials.token === "") {
        navigate('/login');
      }
    };

    checkUserCredentials();
  }, []);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false); // State for CreatePost visibility
  const [showSearchComponent, setShowSearchComponent] = useState(false);
  const [showChatComponent, setShowChatComponent] = useState(false);
  const [showFeed, setShowFeedComponent] = useState(false);

  const handleChatClick = () => {
    setShowChatComponent(prev => !prev); // Toggle the CreatePost visibility
    
   
    setShowNotifications(false);
    
   
    setShowSettings(false);
   
    
    
  };

  const handleSettingsClick = () => {
    setShowSettings(prev => !prev); // Toggle the CreatePost visibility
    // Optionally close other components

    setShowNotifications(false);
    setShowChatComponent(false);
  };
  const handleSearchClick = () => {
    setShowSearchComponent(prev => !prev); // Toggle the SearchComponent visibility
    // Optionally close other components
    // setShowSettings(false);
    // setShowNotifications(false);
    // setShowProfile(false);
    
  };

  const handleNotificationsClick = () => {
    setShowNotifications(prev => !prev);
    setShowSettings(false);
    setShowChatComponent(false);
  };
  const handleProfileClick = () => {
    navigate(`../../../profile/${getUserCredentials().userID}`);

    // Optionally close the other components
    setShowSettings(false);
    setShowNotifications(false);
    setShowCreatePost(false);

  };
  const handleCreatePostClick = () => {
    navigate(`../../create`);
    setShowSettings(false);
    setShowNotifications(false);
 
    setShowSearchComponent(false);
  };
  const handleHomeClick = () => {
    navigate(`../../feed`);
  }
  return (
    <div className='app'>
      <div className='background'></div>
     
       
      <div className="homepage">
          <div className="homepage__nav">

          <Navbar onSettingsClick={handleSettingsClick}
      onNotificationsClick={handleNotificationsClick} onProfileClick= {handleProfileClick} onCreatePostClick={handleCreatePostClick} 
      onSearchClick={handleSearchClick} onChatClick={handleChatClick} onHomeClick={handleHomeClick}
        />

          </div>

          <div className="homepage__timeline">
            <div className="timeline__left">
            {showChatComponent && <Chat onClose={handleChatClick} />}
            {showSettings && <Settings onClose={() => setShowSettings(false)} />}
            {showNotifications && (
                <Notifications 
                  onClose={() => setShowNotifications(false)} 

                />
              )}
            </div>
            
            <div className="timeline__middle">
            {showFeed && <Feed/>}
         {showCreatePost &&<CreatePost onClose={handleCreatePostClick} />}
         { children }
         
            </div>
            <div className="timeline__right">
          {showSearchComponent && <SearchComponent onClose={() => setShowSearchComponent(false)} />}
</div>
            </div>
          </div>
        </div>
      
    
  );
};

export default Homepage;