import React, { ReactNode, useEffect, useState } from "react";
import "./Homepage.css";
import Navbar from "./navigation/Navbar";
import Settings from "./settingsComponent/Settings";
import Notifications from "./notificationComponent/Notifications";
import CreatePost from "./createPostComponent/CreatePost";
import CategoryFilter from "./categoryFilterCompononet/CategoryFilter";
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
  const [showProfile, setShowProfile] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false); // State for CreatePost visibility
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showSearchComponent, setShowSearchComponent] = useState(false);
  const [showChatComponent, setShowChatComponent] = useState(false);
  const [showFeed, setShowFeedComponent] = useState(false);
  const [filter, setFilter] = useState({});
  const handleChatClick = () => {
    setShowChatComponent(prev => !prev); // Toggle the CreatePost visibility
    setShowCategoryFilter(false);
    setShowCreatePost(false);
    setShowNotifications(false);
    setShowProfile(false);
    setShowSearchComponent(false);
    setShowSettings(false);
    setShowNotifications(false);
    
    
  };
  const handleFilterChange = (newFilterData: React.SetStateAction<{}>) => {
    setFilter(newFilterData);
    // Add logic to handle the filter change
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
    setShowCreatePost(false);
    setShowCategoryFilter(false);
  };

  const handleCategoryFilterClick = () => {
    setShowCategoryFilter(prev => !prev);
    setShowProfile(false);
     setShowCreatePost(false);
     setShowSearchComponent(false);
  };
  const handleNotificationsClick = () => {
    setShowNotifications(prev => !prev);
    setShowSettings(false);
    setShowChatComponent(false);
  };
  const handleProfileClick = () => {
    navigate(`../../../profile/${getUserCredentials().userID}`);
    setShowProfile(prev => !prev);
    // Optionally close the other components
    setShowSettings(false);
    setShowNotifications(false);
    setShowCreatePost(false);
    setShowCategoryFilter(false);
  };
  const handleCreatePostClick = () => {
    navigate(`../../create`);
    setShowProfile(false);
    setShowSettings(false);
    setShowNotifications(false);
    setShowCategoryFilter(false);
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
      onNotificationsClick={handleNotificationsClick} onProfileClick= {handleProfileClick} onCreatePostClick={handleCreatePostClick} onCategoryFilterClick={handleCategoryFilterClick}
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
                  notifications={[  { id: 1, time: '9:01 am', userName: 'Ahmet', text: 'followed you.', isSeen: false },
                  { id: 2, time: '9:03 am', userName: 'Ayşe', text: 'liked your post.', isSeen: true },
                  { id: 3, time: '9:07 am', userName: 'Mehmet', text: 'commented: Great work!', isSeen: false },]}
                />
              )}
            </div>
            
            <div className="timeline__middle">
            {showFeed && <Feed/>}
         {showCreatePost &&<CreatePost onClose={handleCreatePostClick} />}
         { children }
         
            </div>
            <div className="timeline__right">
       {showCategoryFilter &&  <CategoryFilter
         onClose={() => setShowCategoryFilter(false)}
          onFilterChange={handleFilterChange}
        /> }
          {showSearchComponent && <SearchComponent onClose={() => setShowSearchComponent(false)} />}
</div>
            </div>
          </div>
        </div>
      
    
  );
};

export default Homepage;