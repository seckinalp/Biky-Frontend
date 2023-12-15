import React from 'react';
import './Comment.css';

export interface CommentProps {
  item: {
    commentId: string;
    postId: string;
    author: {
      userID: string;
      userName: string;
      userProfileLink: string;
    };
    contentText: string;
    commentTime: Date //UTC time

  };
  showDelete: boolean;
  onDelete: () => void;
}

const Comment: React.FC<CommentProps> = ({ item , showDelete ,onDelete}) => {
  const { author, contentText } = item;
  const dateTime: String = item.commentTime.toLocaleDateString();


  return (
    <div className="comment-item">
      <img className="comment-avatar" src={author.userProfileLink} alt={author.userName} />
      <div className="comment-content">
        <span className="comment-author">{author.userName}</span>
        <div className="time-posted">{dateTime}</div>
        <span className="comment-text">{contentText}</span>
        {showDelete && <button onClick={onDelete} className="delete-comment">🗑️</button>}      </div>
    </div>
  );
};

Comment.defaultProps = {
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

    }
export default Comment;
