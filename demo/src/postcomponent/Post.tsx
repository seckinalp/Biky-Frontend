// Post.tsx
import React from 'react';
import './Post.css';

const Post: React.FC = () => {
  return (
    <div className="post-container">
      <div className="post-header">
        <img className="profile-pic" src="profile_pic_url.jpg" alt="Profile" />
        <div className="username-time">
          <div className="username">marc.zucker31axy</div>
          <div className="time-posted">12 Min</div>
        </div>
        <div className="more-options">...</div>
      </div>
      <div className="post-content">
        <p className="post-text">Elon I will beat you !!!</p>
        <img className="post-image" src="post_image_url.jpg" alt="Post content" />
      </div>
      <div className="post-actions">
        <span className="like-count">1125 likes</span>
        <div className="post-buttons">
          <button className="like-button">Like</button>
          <button className="comment-button">Comment</button>
          <button className="share-button">Share</button>
        </div>
      </div>
    </div>
  );
};

export default Post;