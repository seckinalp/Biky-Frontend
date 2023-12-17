// Post.tsx
import React from 'react';
import './Post.css';
import { useState } from 'react';
import { DeletePost, imageLink } from '../logic/backend';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { AddComment, FetchComment } from '../logic/backend';
import Report from '../comment/Report'; // Import Report component here
import { getUserCredentials } from '../logic/cookie';


export const frontendlink = "http://localhost:5173/";
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
  const reportItem = {
    authorID: props.item.authorID,
    reportedID: props.item.postID, // it should be global userId
    reportType: 0, // You'll need to define this
    reportCategory: "Post", // Example category
    reportData: "props.item.content" // or any relevant data
  };
  const userID = getUserCredentials().userID;
  const [showDeletePost,setshowDeletePost] = useState(props.item.author.userID == userID);//props.item.author.userID == userID
  const [visible, setVisible] = useState(true);

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
  const toggleReport = () => {
    setShowOptions(prevShow => !prevShow);
  };
  const goPrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const goNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

 
  const handleDelete = () => {
    setVisible(false);
    DeletePost(props.item.postID);
  }
  return (
    visible && 
    <div className="post-container">
      <div className="post-header">
        <img className="profile-pic" src={props.item.isAnonymous || props.item.author.profileImage == null || props.item.author.profileImage == "" ? "../../public/ppdefault.jpg" : `${imageLink}${props.item.author.profileImage}`
      } alt="Profile"/>
        <div className="username-time">
        <div className="username">
  {props.item.isAnonymous ? "Anonymous" : <a href={`${frontendlink}profile/${props.item.author.userID}`}>{props.item.author.nickname}</a>}</div>
          <div className="time-posted">{props.item.postTime}</div>
        </div>
        {showDeletePost ?(
          <button  className="delete-postc"onClick={handleDelete}>🗑️</button>

        ) : (<button  className="delete-postc2"onClick={toggleReport}>🚩</button>)}
      </div>
            {showOptions && (
        <div className="comment-report-container">
          <Report
            item={reportItem}
            isVisable={showOptions}
            onVisibilityChange={toggleReport}
          />
          </div>
        )}
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