import { CommentClass, CommentProps } from "../comment/Comment";

export const siteLink = "https://localhost:7172/";
export const imageLink = `${siteLink}images/`;

export async function FetchSocialMediaFollowerFeed(token : String) {
    const response = await fetch(`${siteLink}SocialMediaPost/GetFeed`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Failed to fetch social media posts');
      }
    
      return resData.posts;
}

export async function FetchComment(postID : String) : Promise<CommentClass[]> {
console.log(`${siteLink}Comment/GetByPost`);
  const response = await fetch(`${siteLink}Comment/GetByPost?postID=${postID}`, {
method: 'GET',
headers: {
  'Content-Type': 'application/json',
  //'postID': `${postID}`,
},
});
  const resData = await response.json();
  if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    console.log(resData);
    return resData;
}

export async function AddComment(postID : String, content : String, token: String) : Promise<void> {
  const response = await fetch(`${siteLink}/Comment/Add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      postID: postID,
      content: content,
    }),
  });
      const resData = await response.json();
      if (!response.ok) {
          throw new Error('Failed to add comment');
        }
      
        return resData.posts;
}