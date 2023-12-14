import { PostProps } from "./Post"

interface SocialMediaPostProps {
    item: {
          postID: "string"
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
    const { postID, author, imagesID, contentText, postTime } = socialMediaPost.item;
    return {
      item: {
        postID,
        author,
        imagesID,
        contentText,
        postTime,
      },
    };
  };

