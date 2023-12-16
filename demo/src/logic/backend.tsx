import { Category } from "../categoryFilterCompononet/CategoryFilter";
import { CommentClass, CommentProps } from "../comment/Comment";
import { SalePostClass } from "../postcomponent/SalePost";
import { SocialMediaPostClass, SocialMediaPostProps } from "../postcomponent/SocialMediaPost";
import { ProfileClass } from "../profilecomponent/Profile";
import { getUserCredentials } from "./cookie";

export const siteLink = "https://localhost:7172/";
export const imageLink = `${siteLink}images/`;

export async function FetchComment(postID : String) : Promise<CommentClass[]> {
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

export async function AddComment(postID : String, content : String) : Promise<void> {
  const {token} = getUserCredentials();
  const response = await fetch(`${siteLink}Comment/Add`, {
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

export async function DeleteComment(commentID: string): Promise<void> {
  const { token, userID } = getUserCredentials();
  const url = `${siteLink}Comment/Delete?commentID=${commentID}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete comment');
  }
}

export interface UserCredentials {
  token: String,
  userID: String
}

export async function LoginRequest(name : String, password : String) : Promise<UserCredentials> {
  const response = await fetch(`${siteLink}User/Login`, {
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

export async function RegisterRequest(universityID : String, nickname: String, email : String,  password : String) : Promise<void> {
  const response = await fetch(`${siteLink}User/Register`, {
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
  if (!response.ok) {
      throw new Error('Failed to register');
    }
}

export async function FetchCategories() : Promise<Category[]> {
  const response = await fetch(`${siteLink}Category/Get`, {
method: 'GET',
headers: {
  'Content-Type': 'application/json',
},
});
  const resData = await response.json();
  if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    return [resData];
}

export async function FetchGuestFeedSocial() : Promise<SocialMediaPostProps[]> {
  const response = await fetch(`${siteLink}SocialMediaPost/GetGuestFeed`, {
method: 'GET',
headers: {
  'Content-Type': 'application/json',
},
});
  const resData = await response.json();
  if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    return [resData];
}

export async function UploadFile(file: File): Promise<string> {

  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await fetch(`${siteLink}Image/Upload`, {
      method: "POST",
      headers: {
      },
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to upload file: ${errorData.message}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export async function FetchProfile(userID: String) : Promise<ProfileClass> {
  const response = await fetch(`${siteLink}User/GetProfile?userID=${userID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    });
    console.log(response);
      const resData = await response.json();
      if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        console.log(resData);
        return resData;
}

export async function UpdateProfile(
  nickname: string | undefined,
  profileImage: string | null | undefined,
  description: string | undefined
): Promise<void> {
  const { token, userID } = getUserCredentials();

  // Type assertion for nickname
  const safeNickname = nickname!;
  console.log(`${siteLink}User/UpdateProfile?nickname=${safeNickname}&profileImage=${profileImage}&description=${description}&userID=${userID}`);
const response = await fetch(`${siteLink}User/UpdateProfile?nickname=${safeNickname}&profileImage=${profileImage}&description=${description}&userID=${userID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  console.log(response + "aaaaaaaaa");
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
}

export async function CheckFollow(followingID: String) : Promise<boolean> {
  const { token, userID } = getUserCredentials();
  console.log(`${siteLink}User/CheckFollowing?followingID=${followingID}`);
  const response = await fetch(`${siteLink}User/CheckFollowing?followingID=${followingID}&followerID=${userID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    });
      const resData = await response.json();
      if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        return resData;
}

export async function AddFollow(followingID: String) : Promise<void> {
  const { token, userID } = getUserCredentials();
  const response = await fetch(`${siteLink}User/AddFollowing?followingID=${followingID}&followerID=${userID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    });
    
      if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
}

export async function RemoveFollow(followingID: String) : Promise<void> {
  const { token, userID } = getUserCredentials();
  const response = await fetch(`${siteLink}User/DeleteFollowing?followingID=${followingID}&followerID=${userID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    });
    
      if (!response.ok) {
          throw new Error('Failed to fetch profile');
      }
}

export async function GetSocialUser(authorID: String) : Promise<SocialMediaPostClass[]> {
  const { token, userID } = getUserCredentials();
  const response = await fetch(`${siteLink}SocialMediaPost/GetPostByUser?authorID=${authorID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    });
    console.log(response);
      if (!response.ok) {
          throw new Error('Failed to fetch posts');
      }

    const resData = await response.json();
    return resData;
}

export async function GetSaleUser(authorID: String) : Promise<SalePostClass[]> {
  const { token, userID } = getUserCredentials();
  const response = await fetch(`${siteLink}SalePost/GetPostByUser?authorID=${authorID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    });
    
      if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

    const resData = await response.json();
    return resData;
}

export async function AddLike(postID: String) : Promise<void> {
  const { token, userID } = getUserCredentials();
  const response = await fetch(`${siteLink}Like/Add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(
      {postID : postID}
    )
    });
    
      if (!response.ok) {
          throw new Error('Failed to add like');
        }
}

export async function RemoveLike(postID: String) : Promise<void> {
  const { token, userID } = getUserCredentials();
  const response = await fetch(`${siteLink}Like/Remove`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(
      {postID : postID}
    )
    });
    
      if (!response.ok) {
          throw new Error('Failed to remove like');
        }
}