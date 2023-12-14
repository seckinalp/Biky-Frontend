import { PostProps } from "./Post"
import Post from "./Post"
import { useState } from 'react';


interface SocialMediaPostProps {
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
          isLiked : string //to show it is liked by viewing user
          isAnonymous: string
          }
  }
  const convertToPostProps = (socialMediaPost: SocialMediaPostProps): PostProps => {
    const { postID, author, imagesID, contentText, postTime} = socialMediaPost.item;
     const post : PostProps = {
      item: {
        postID,
        author,
        imagesID,
        contentText,
        postTime,
      },
    };
    return post;
  };
  const [socialMediaPost, setSocialMediaPost] = useState({
    likeCount: 1125, // Initialize like count
    liked: false, // State to track if the user has liked the post
  });
  const toggleLike = () => {
    setSocialMediaPost((prevPost) => ({
      liked: !prevPost.liked,
      likeCount: prevPost.liked ? prevPost.likeCount - 1 : prevPost.likeCount + 1,
    }));
  };
  const handleComment = () => {
    // Placeholder for comment logic
  };

  // Empty function for handling share action
  const handleShare = () => {
    // Placeholder for share logic
  };

  const SocialMediaPost: React.FC<SocialMediaPostProps> = (props) => {
    return <>
    <Post item = {convertToPostProps(props).item}/>
    <div className="post-actions">
        <div className="post-buttons">
        <button className={`like-button ${socialMediaPost.liked ? 'liked' : ''}`} onClick={toggleLike}>
            👍
            <span className="like-count">{socialMediaPost.likeCount}</span>
          </button>
          <button className="comment-button" onClick={handleComment}>💬 Comment</button>
          <button className="share-button" onClick={handleShare}>🔗 Share</button>
        </div>
      </div>
    </>
  }