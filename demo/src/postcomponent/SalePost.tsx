import { PostProps } from "./Post"
import Post from "./Post"

export interface SalePostProps {
    item: {
          postType: Number
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
          price: String
          }
  }

  const convertToPostProps = (salePost: SalePostProps): PostProps => {
    const { postID, author, imagesID, contentText, postTime} = salePost.item;
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

  const SocialMediaPost: React.FC<SalePostProps> = (props) => {
    return <>
    <Post item = {convertToPostProps(props).item}/>
    <div className="post-actions">
        <text> Price = {props.item.price}</text>
      </div>
    </>
  }