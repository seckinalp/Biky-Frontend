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
      if (!response.ok) {
          throw new Error('Failed to add comment');
        }
}

export async function DeleteComment(commentID : String,  token: String) : Promise<void> {
  const response = await fetch(`${siteLink}/Comment/Delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'CommentID': ''
    }
});
      if (!response.ok) {
          throw new Error('Failed to add comment');
        }
}

export interface UserCredentials {
  Token: String,
  UserID: String
}

export async function Login(name : String, password : String) : Promise<UserCredentials> {
  const response = await fetch(`${siteLink}/User/Login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Nickname: name,
      Password: password
    }),
  });
  const resData = await response.json();
  if (!response.ok) {
      throw new Error('Failed to login');
    }
    return resData;
}

export async function Register(universityID : String, nickname: String, email : String,  password : String) : Promise<void> {
  const response = await fetch(`${siteLink}/User/Login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      UniversityID: universityID,
      Nickname: nickname,
      Email: email,
      Password: password
    }),
  });
  const resData = await response.json();
  if (!response.ok) {
      throw new Error('Failed to register');
    }
    return resData;
}