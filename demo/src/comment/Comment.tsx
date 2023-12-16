import React from 'react';
import './Comment.css';
import { imageLink } from '../logic/backend';

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

  return (
    <div className="comment-item">
      <img className="comment-avatar" src={item.author.profileImage == "" || item.author.profileImage == null ? "../../public/ppdefault.jpg" : `${imageLink}${item.author.profileImage}`} alt={author.nickname} />
      <div className="comment-content">
        <span className="comment-author">{author.nickname}</span>
        <div className="time-posted">{postTime}</div>
        <span className="comment-text">{content}</span>
        {showDelete && <button onClick={onDelete} className="delete-comment">🗑️</button>}      </div>
    </div>
  );
};

/*Comment.defaultProps = {
    item: {
        commentId: "1111",
        postId: "2222",
        author: {
          userID: "1234",
          userName: "dedeler",
          userProfileLink: "../public/profile.png",
        },
        contentText: "this is comment",
        commentTime: new Date(), // Current date-time as default

      },
      showDelete : true,

    }*/
export default Comment;
