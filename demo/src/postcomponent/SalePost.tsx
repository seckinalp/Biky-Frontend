import React, { useState } from 'react';
import Post from "./Post";
import Comments from '../comment/Comments';
import  { CommentProps } from '../comment/Comment';
  
  export interface SalePostProps {
    item: SalePostClass,
    isAnonymous?: false;
  }

  export interface SalePostClass{
    
      postType: number,
      price: number,
      categoryID: number,
      postID: string,
      authorID: string,
      contentText: string,
      images: [],
      author: {
        userID: string,
        nickname: string,
        profileImage: string,
      },
      postTime: string
  }
  
  const SalePost: React.FC<SalePostProps> = (props) => {
    
  
    const [showComments, setShowComments] = useState(false);
  
    const toggleComments = () => {
      setShowComments(!showComments);
    };
    return (
  
      <>
      <Post item={props.item}  />
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
  