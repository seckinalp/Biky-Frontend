import React, { useState } from 'react';
import Post, { PostProps } from "./Post";
import Comments from '../comment/Comments';

  
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
      images: string[],
      author: {
        userID: string,
        nickname: string,
        profileImage: string,
      },
      postTime: string
  }
  function convertToPostProps(salePost: SalePostProps): PostProps {
    return {
      item: {
        postID: salePost.item.postID,
        authorID: salePost.item.authorID,
        contentText: salePost.item.contentText,
        images: salePost.item.images,
        author: {
          userID: salePost.item.author.userID,
          nickname: salePost.item.author.nickname,
          profileImage: salePost.item.author.profileImage,
        },
        postTime: salePost.item.postTime,
        isAnonymous: false,
      }
    };
  }
  
  const SalePost: React.FC<SalePostProps> = (props) => {
    
  
    const [showComments, setShowComments] = useState(false);
  
    const toggleComments = () => {
      setShowComments(!showComments);
    };
    return (
      <>
      <Post item={convertToPostProps(props).item}  />
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
      {showComments && <Comments postID = {props.item.postID}/>}
      </>
    );
  }
  
  export default SalePost;
  