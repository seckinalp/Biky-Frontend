import React, { useEffect, useState } from 'react';
import Post, { PostProps } from "./Post";
import Comments from '../comment/Comments';
import  { CommentProps } from '../comment/Comment';
import { AddLike, RemoveLike } from '../logic/backend';

export interface SocialMediaPostProps {
  item: SocialMediaPostClass,
}


export interface SocialMediaPostClass {
    postID: string;
    author: {
      userID: string;
      nickname: string;
      profileImage: string;
    };
    images: string[];
    contentText: string;
    postTime: string; // UTC time
    isLiked: boolean; // to show it is liked by viewing user
    isAnonymous: boolean;
    likes: number;
}

function convertToPostProps(socialMediaPost: SocialMediaPostProps, onDelete: () => void): PostProps {
  return {
    item: {
      postID: socialMediaPost.item.postID,
      authorID: socialMediaPost.item.author.userID,
      contentText: socialMediaPost.item.contentText,
      images: socialMediaPost.item.images,
      author: {
        userID: socialMediaPost.item.author.userID,
        nickname: socialMediaPost.item.author.nickname,
        profileImage: socialMediaPost.item.author.profileImage, // No direct equivalent, set a default or handle accordingly
      },
      postTime: socialMediaPost.item.postTime, // Convert Date to string
      isAnonymous: socialMediaPost.item.isAnonymous
    },
    handleDelete: onDelete
  };
}

const SocialMediaPost: React.FC<SocialMediaPostProps> = (props) => {
  console.log(props.item.likes);
  console.log(props.item.isLiked);
  const[visible,setVisible] = useState(true);
  const handleVisible = () => {
    setVisible(false);
  }
  const [likeState, setLikeState] = useState({
    likeCount: props.item.likes, // Initialize like count
    liked: props.item.isLiked, // Initialize with the prop value
  });

  const toggleLike = () => {
    setLikeState(prevState => ({
      liked: !prevState.liked,
      likeCount: prevState.liked ? prevState.likeCount - 1 : prevState.likeCount + 1,
    }));
    if(!likeState.liked) {
      try {
        AddLike(props.item.postID);
      }
      catch (error) {
        console.error('Error fetching posts:', error);
      }
    } else {
      try {
        RemoveLike(props.item.postID);
      }
      catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
  };

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentProps[]>([]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const reloadComments = () => {
    
  }
  
  if(!visible) {
    return <></>
  }
  return (

    <>
     <Post item={convertToPostProps(props, handleVisible).item} handleDelete={convertToPostProps(props, handleVisible).handleDelete } />
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
    {showComments && <Comments postID = {props.item.postID}/>} 
    </>
  );
}

export default SocialMediaPost;
