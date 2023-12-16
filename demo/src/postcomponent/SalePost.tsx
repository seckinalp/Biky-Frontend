import React, { useState } from 'react';
import Post from "./Post";
import Comments from '../comment/Comments';
import  { CommentProps } from '../comment/Comment';
  
  export interface SalePostProps {
    item: {
      postType: Number
      postID: string;
      author: {
        userID: string;
        userName: string;
        userProfileLink: string;
      };
      imagesID: string[];
      contentText: string;
      postTime: Date; // UTC time
      price: String
      isAnonymous: false;
      initialComments: CommentProps[];
    };
  }
  
  const SalePost: React.FC<SalePostProps> = (props) => {
    
  
    const [showComments, setShowComments] = useState(false);
  
    const toggleComments = () => {
      setShowComments(!showComments);
    };
    return (
  
      <>
      <Post item={props.item} />
        <div className="post-container">
        <div className="post-actions">
          <div className="post-buttons">
            <button className={`price-button`}>
            💰 <span className="price-count">{props.item.price}</span>
            </button>
            <button className="comment-button" onClick={toggleComments}>💬 Comment</button>
          </div>
        </div>
      </div>
      {showComments && <Comments initialcomments={props.item.initialComments} author={props.item.author} />}
      </>
    );
  }
  
  export default SalePost;
  