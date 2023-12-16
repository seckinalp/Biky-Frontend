// Post.tsx
import React from 'react';
import './Post.css';
import { useState } from 'react';
import { imageLink } from '../logic/backend';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { AddComment, FetchComment } from '../logic/backend';

export interface PostProps {
  item: {
      postID: string,
      authorID: string,
      contentText: string,
      images: string[],
      author: {
        userID: string,
        nickname: string,
        profileImage: string,
      },
      postTime: string
      isAnonymous: boolean // Added isAnonymous flag 
  }
}
//assuming we pass the post as props.item
const Post: React.FC<PostProps> = (props) => {
  const userID = useSelector((state : RootState) => state.auth.userID);

  const [showDeletePost,setshowDeletePost] = useState(props.item.author.userID == userID);


  const user = {}; // Placeholder for user object from backend

  // Empty function to handle report user action
  const handleReportUser = (user: any) => {
    // Placeholder for logic to report a user
  };

  // Empty function to handle unfollow user action


  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images: string[] = props.item.images
  ? props.item.images.map((images) => `${imageLink}${images}`)
  : [];

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
        <img className="profile-pic" src={props.item.isAnonymous || props.item.author.profileImage == null ? "../../public/ppdefault.jpg" : `${imageLink}${props.item.author.profileImage}`
      } alt="Profile"/>
        <div className="username-time">
          <div className="username">{props.item.isAnonymous ? "Anonymous" : props.item.author.nickname}</div>
          <div className="time-posted">{props.item.postTime}</div>
        </div>
        {showDeletePost && <button  className="delete-postc">🗑️</button>}
        <div className="more-options" onClick={toggleOptions}>
       
          <div className="more-options-icon">...</div>
          {showOptions && (
            <div className="options-panel">
            <button className="option-button" onClick={() => handleReportUser(user)}>Report User</button>
          </div>
          )}
        </div>
      </div>
      <div className="post-content">
        <p className="post-text">{props.item.contentText}</p>
        {images.length !== 0 &&(
           <>
           {images && <div className="post-image-carousel">
             <img className="post-image" src={images[currentImageIndex]} alt="Post content" />
             {images.length > 1 && (
             <>
             <button className="carousel-arrow left" onClick={goPrev}>‹</button>
             <button className="carousel-arrow right" onClick={goNext}>›</button>
             </>
             )}
           </div>}
           </>          
        )
        
        }
       
      </div>
      </div>
  );
};

export default Post;