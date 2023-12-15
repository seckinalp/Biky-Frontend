// Comments.tsx
import React from 'react';
import { useState } from 'react';
import Comment, { CommentProps } from './Comment';
import './Comments.css';


export interface CommentsProps {
  initialcomments: CommentProps[]
  author: 
    {
    userID: string
    userName: string
    userProfileLink: string
    }
}


const Comments: React.FC<CommentsProps> = ({ initialcomments, author }) => {
    const [comments, setComments] = useState(initialcomments);
    
    const [isVisible, setIsVisible] = useState(true); // State to control visibility
    
    const [newCommentText, setNewCommentText] = useState('');

    const handleNewCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewCommentText(e.target.value);
    };
    const handleSendComment = () => {
        const newComment: CommentProps = {
            item: {
                commentId: '1234', // `${new Date().getTime()}` Generate a unique ID (for example, based on timestamp)
                postId: '123', // You need to provide the correct post ID here
                author: author,
                contentText: newCommentText,
                commentTime: new Date(), // Current date-time as default

            },
            showDelete: false,
            onDelete: function (): void {
                throw new Error('Function not implemented.');
            }
        };
        setComments([...comments, newComment]);
        setNewCommentText('');// Clear input field after sending comment
     } 

    const handleClose = () => {
        setIsVisible(false); // Function to hide the comment section
      };
      if (!isVisible) {
        return null; // Don't render anything if the comment section is not visible
      }
      const handleDelete = (commentId: string) => {
        // Filter out the comment that needs to be deleted
        const updatedComments = comments.filter(comment => comment.item.commentId !== commentId);
        setComments(updatedComments);
      };
  
    const displayedComments = [...comments].reverse();
    return (
    <div className="comment-section">
      <div className="comment-header">
        <strong>Comments</strong>
        <button className="close-button"onClick={handleClose}>X</button>
      </div>
      <div className="comment-list">
      {displayedComments.map((comment) => (
        <Comment 
        key={comment.item.commentId} 
        item={comment.item} 
        showDelete={comment.item.author.userID === author.userID}
        onDelete={() => handleDelete(comment.item.commentId)}
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

Comments.defaultProps = {
    initialcomments: [
      {
        item: {
          commentId: "defaultCommentId0",
          postId: "defaultPostId",
          author: {
            userID: "defaultUserId",
            userName: "Default User",
            userProfileLink: "../public/profile.png", // Ensure this path is correct
          },
          contentText: "This is a default comment. ashjdkhsakjfhdsljkfhljksahjklshfkljdsahfjlkdhgbkljvb cxlkjafhndjılkghbvl jkln lk fnfjvasdasdsdfa asdfadsfkjdshgfhagdbkfjhxn cnads bfjhcabcxnvbcjklsadhsbjömasb chdsnhfdblkjasmhdxfblhdnbashjhdjöhcnjkladsöfamhbdhlkJGSAFBHADHFJKDFADSFADSFSDIUHASDBFKHSDASDASDV DSSADSA SDASDAS SADASD QNFBLJHDFJXCNKhbhkasnzxgfbnASASD DFSDFD",
          commentTime: new Date(), // Current date-time as default

        },
        showDelete: true,
        onDelete: () => { console.log('Default delete function'); },
      },
      {
        item: {
          commentId: "defaultCommentId1",
          postId: "defaultPostId",
          author: {
            userID: "1234",
            userName: "Default User",
            userProfileLink: "../public/profile.png", // Ensure this path is correct
          },
          contentText: "This is a default comment.",
          commentTime: new Date(), // Current date-time as default

        },
        showDelete: true,
        onDelete: () => { console.log('Default delete function'); },

      },
      {
        item: {
          commentId: "defaultCommentId2",
          postId: "defaultPostId",
          author: {
            userID: "1234",
            userName: "Default User",
            userProfileLink: "../public/profile.png", // Ensure this path is correct
          },
          contentText: "This is a default coasdmment.",
          commentTime: new Date(), // Current date-time as default

        },
        showDelete: false,
        onDelete: () => { console.log('Default delete function'); },
      },
      
      // You can add more default comments in similar structure
    ],
    author: 
    {
    userID: "1234",
    userName: "dedecom",
    userProfileLink: "../public/profile.png",
    }
  };


export default Comments;
