import React, { useState } from 'react';
import Post from "./Post";
import Comments from '../comment/Comments';
import  { CommentProps } from '../comment/Comment';
import  { useSelector } from 'react-redux';

export interface SocialMediaPostProps {
  item: {
    postID: string;
    author: {
      userID: string;
      userName: string;
      userProfileLink: string;
    };
    imagesID: string[];
    contentText: string;
    postTime: Date; // UTC time
    isLiked: boolean; // to show it is liked by viewing user
    isAnonymous: boolean;
    likecount: number;
  };
}

const SocialMediaPost: React.FC<SocialMediaPostProps> = (props) => {
  
  
  const [likeState, setLikeState] = useState({
    likeCount: props.item.likecount, // Initialize like count
    liked: props.item.isLiked, // Initialize with the prop value
  });

  const toggleLike = () => {
    setLikeState(prevState => ({
      liked: !prevState.liked,
      likeCount: prevState.liked ? prevState.likeCount - 1 : prevState.likeCount + 1,
    }));
  };

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentProps[]>([]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const reloadComments = () => {
    
  }
  return (

    <>
    <Post item={props.item} />
      <div className="post-container">
      <div className="post-actions">
        <div className="post-buttons">
          <button className={`like-button ${likeState.liked ? 'liked' : ''}`} onClick={toggleLike}>
            👍 <span className="like-count">{likeState.likeCount}</span>
          </button>
          <button className="comment-button" onClick={toggleComments}>💬 Comment</button>
        </div>
      </div>
    </div>
    {showComments && <Comments postID={props.item.postID}/>}
    </>
  );
}

export default SocialMediaPost;
