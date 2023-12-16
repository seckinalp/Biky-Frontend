// Comments.tsx
import React, { useEffect } from 'react';
import { useState} from 'react';
import Comment, { CommentProps, CommentClass } from './Comment';
import './Comments.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { AddComment, FetchComment } from '../logic/backend';
import { getUserCredentials } from '../logic/cookie';


export interface CommentsProps {
  postID: String
  //initialcomments: CommentProps[]
}


const Comments: React.FC<CommentsProps> = ({postID}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(true);
  const [comments, setComments] = useState<CommentClass[]>([]);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedComments = await FetchComment(postID);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (reload) {
      
      fetchData();
      setReload(false); 
    }
  }, [reload]); 

  const reloadComments = () => {
    setReload(true);
  };
    
    const [newCommentText, setNewCommentText] = useState('');
    const [isInputValid, setIsInputValid] = useState(true); // State to track input validation
    const {userID} = getUserCredentials();

    const handleNewCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewCommentText(e.target.value);
      setIsInputValid(true); // Reset validation state on typing

    };
    const handleSendComment = () => {
      if(newCommentText != "") {
      AddComment(postID, newCommentText).then(() => {
        reloadComments();
        setNewCommentText(''); // Clear input field after sending comment
      
      });
    }
    };
    


      const handleDelete = (commentId: string) => {
        reloadComments();
      };

    //const displayedComments = [...comments].reverse();
    return (  loading ? <div>reloading </div> :
    <div className="comment-section">
      <div className="comment-header">
        <strong>Comments</strong>
      </div>
      <div className="comment-list">
      {comments.map((comment) => (
        <Comment 
        key={comment.commentID} 
        item={comment} 
        showDelete={comment.author.userID === userID}
        onDelete={() => handleDelete(comment.commentID)}
        />
        ))}
      </div>
      <div className="comment-input">
        <input
          type="text"
          value={newCommentText}
          onChange={handleNewCommentChange}
          placeholder="Type your comment here..."
        />
        <button className="send-button"onClick={handleSendComment}>📤</button>
      </div>
    </div>
      );
};

export default Comments;
