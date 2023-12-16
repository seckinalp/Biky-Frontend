// Post.tsx
import React from 'react';
import './Post.css';
import { useState } from 'react';
import { imageLink } from '../logic/backend';

export interface PostProps {
  item: {
		postID: string
		author: 
			{
			userID: string
			userName: string
			userProfileLink: string
			}
		imagesID: string[]
		contentText: string
		postTime: Date //UTC time
    isAnonymous: boolean // Added isAnonymous flag
		}
    
}
//assuming we pass the post as props.item
const Post: React.FC<PostProps> = (props) => {
  const [globalId, setGlobalId] = useState("1234");

  const [showDeletePost,setshowDeletePost] = useState(props.item.author.userID == globalId);


  const user = {}; // Placeholder for user object from backend

  // Empty function to handle report user action
  const handleReportUser = (user: any) => {
    // Placeholder for logic to report a user
  };

  // Empty function to handle unfollow user action
  const handleUnfollowUser = (user: any) => {
    // Placeholder for logic to unfollow a user
  };


  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images: string[] = props.item.imagesID
  ? props.item.imagesID.map((imageID) => `${imageLink}${imageID}`)
  : [];
  const dateTime: String = props.item.postTime.toLocaleDateString();

  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => {
    setShowOptions(prevShow => !prevShow);
  };
  const goPrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const goNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

 

  return (
    <div className="post-container">
      <div className="post-header">
        <img className="profile-pic" src={props.item.isAnonymous ? "../public/ppdefault.jpg" : props.item.author.userProfileLink} alt="Profile"/>
        <div className="username-time">
          <div className="username">{props.item.isAnonymous ? "Anonymous" : props.item.author.userName}</div>
          <div className="time-posted">{dateTime}</div>
        </div>
        {showDeletePost && <button  className="delete-postc">🗑️</button>}
        <div className="more-options" onClick={toggleOptions}>
       
          <div className="more-options-icon">...</div>
          {showOptions && (
            <div className="options-panel">
            <button className="option-button" onClick={() => handleReportUser(user)}>Report User</button>
            <button className="option-button" onClick={() => handleUnfollowUser(user)}>Unfollow User</button>
          </div>
          )}
        </div>
      </div>
      <div className="post-content">
        <p className="post-text">{props.item.contentText}</p>
        {images && <div className="post-image-carousel">
          <img className="post-image" src={images[currentImageIndex]} alt="Post content" />
          {images.length > 1 && (
          <>
          <button className="carousel-arrow left" onClick={goPrev}>‹</button>
          <button className="carousel-arrow right" onClick={goNext}>›</button>
          </>
          )}
        </div>}
      </div>
      </div>
  );
};

export default Post;