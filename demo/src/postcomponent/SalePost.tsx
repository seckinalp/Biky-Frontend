import React, { useState } from 'react';
import Post, { PostProps } from "./Post";
import Comments from '../comment/Comments';
import { GetCategoryName, SendMessage } from '../logic/backend';
import { getUserCredentials } from '../logic/cookie';

  
  export interface SalePostProps {
    item: SalePostClass,
    isAnonymous?: false;
  }

  export const reverseCategoryMap: { [key: number]: string } = {
    1: 'lost & found',
    3: 'second hand',
    2: 'private lesson',
    4: 'trade',
    0: 'borrow',
  };
  

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
  
  function convertToPostProps(salePost: SalePostProps,onDelete: () => void): PostProps {
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
      },
      handleDelete: onDelete
    };
  }
  
  const SalePost: React.FC<SalePostProps> = (props) => {
    console.log(props);
    const[visible,setVisible] = useState(true);
    const[sent, isSent] = useState(false);
    const handleVisible = () => {
    setVisible(false);
  }
    const [showComments, setShowComments] = useState(false);
    const getSpecialButton = () => {
      switch (props.item.postType) {
        case 1: // lostAndFound
          return <button className="special-button">Lost & Found</button>;
        case 2: // privateLesson
          return <button className="special-button">Private Lesson</button>;
        case 3: // secondHand
          return <button className="special-button">Second Hand</button>;
        case 4: // trade
          return <button className="special-button">Trade</button>;
        case 0: // borrow
          return <button className="special-button">Borrow</button>;
        default:
          return null;
      }
    };
    const sendDM = async () => {
      if(!sent) {
      try {
        const categoryName = await  GetCategoryName(props.item.categoryID);
      SendMessage(props.item.authorID, "Hello, I saw your " +
       reverseCategoryMap[props.item.postType] + " post about " + categoryName + ". Can we talk about it?"  );
      } catch (error) {
        console.log(error);
      }
      isSent(true);
    }
    }
  
    const toggleComments = () => {
      setShowComments(!showComments);
    };

    if(!visible) {
      return <></>
    }
    return (
      <>
        <Post item={convertToPostProps(props, handleVisible).item} handleDelete={convertToPostProps(props, handleVisible).handleDelete } />
        <div className="post-container">
        <div className="post-actions">
          <div className="post-buttons">
            <button className={`price-button`}>
            💰 <span className="price-count">{props.item.price}</span>
            </button>
            {getSpecialButton()}
            <button className="comment-button" onClick={toggleComments}>💬 Comment</button>
            {getUserCredentials().userID !== props.item.authorID && 
            (!sent ? <button className="comment-button" onClick={sendDM}>📨 Auto DM</button> : <button className="comment-button">Sent! Check chat </button>)}
          </div>
        </div>
      </div>
      {showComments && <Comments postID = {props.item.postID}/>}
      </>
    );
  }
  
  export default SalePost;
  