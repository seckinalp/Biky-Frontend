import './Comment.css';
import { imageLink } from '../logic/backend';
import React, { useState } from 'react';
import Report from './Report'; // Import Report component here



export interface CommentProps {
  item: CommentClass,
  showDelete: boolean;
  onDelete: () => void;
}

export interface CommentClass {
  commentID: string;
    postID: string;
    authorID: string;
    author: {
      userID: string;
      nickname: string;
      profileImage: string;
    };
    content: string;
    postTime: string //UTC time
}


const Comment: React.FC<CommentProps> = ({ item , showDelete ,onDelete}) => {
  const { author, content, postTime } = item;
  const [isReportVisible,setIsReportVisible] = useState(false)
  
  const onReport = () => {
    setIsReportVisible(!isReportVisible); // Toggle report visibility
  };
  const handleReportVisibilityChange = (visible: boolean) => {
    setIsReportVisible(visible);
  };


  const reportItem = {
    authorID: item.authorID,
    reportedID: item.postID, // it should be global userId
    reportType: 0, // You'll need to define this
    reportCategory: "Comment", // Example category
    reportData: "item.content" // or any relevant data
  };

  return (
    <div className="comment-container">
    <div className="comment-item">
      <img className="comment-avatar" src={item.author.profileImage == "" || item.author.profileImage == null ? "../../public/ppdefault.jpg" : `${imageLink}${item.author.profileImage}`} alt={author.nickname} />
      <div className="comment-content">
        <span className="comment-author">{author.nickname}</span>
        <div className="time-posted">{postTime}</div>
        <span className="comment-text">{content}</span>
        {showDelete ? (
            <button onClick={onDelete} className="shared-button-style">🗑️</button>
        ) : (
            <button onClick={onReport} className="shared-button-style2">🚩</button> 
        )}   
      </div>
    </div>
    {isReportVisible && (
        <div className="comment-report-container">
          <Report
            item={reportItem}
            isVisable={isReportVisible}
            onVisibilityChange={handleReportVisibilityChange}
          />
    </div>
      )}
  </div>

  );
};
export default Comment;
