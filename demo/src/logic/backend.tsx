import { Category } from "../categoryFilterCompononet/CategoryFilter";
import { CommentClass, CommentProps, userSendRequest } from "../comment/Comment";
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

export async function GetSaleAll() : Promise<SalePostClass[]> {
  const { token, userID } = getUserCredentials();
  const response = await fetch(`${siteLink}SalePost/GetAll`, {
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

export async function GetSaleFollowings() : Promise<SalePostClass[]> {
  const { token, userID } = getUserCredentials();
  const response = await fetch(`${siteLink}SalePost/GetFollowings`, {
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

export async function GetSaleFiltered(
  min: number | undefined,
  max: number | undefined,
  type: number | undefined,
  categoryid: number | undefined,
  contains: string | undefined
): Promise<SalePostClass[]> {
  const { token, userID } = getUserCredentials();

  // Create an object to hold non-null and non-empty values
  const payload: Record<string, number | string> = {};

  // Check and add min if it's a valid number
  if (min && min !== null && !isNaN(min)) {
    payload.min = min;
  }

  // Check and add max if it's a valid number
  if (max && max !== null && !isNaN(max)) {
    payload.max = max;
  }

  // Check and add type if it's a valid number
  if (type && type !== null && !isNaN(type) && type >= 0) {
    payload.type = type;
  }

  // Check and add categoryid if it's a valid number
  if (categoryid && categoryid !== null && !isNaN(categoryid)) {
    payload.categoryid = categoryid;
  }

  // Check and add contains if it's not null or an empty string
  if (contains && contains !== null && contains.trim() !== "") {
    payload.contains = contains;
  }

  const response = await fetch(`${siteLink}SalePost/GetFiltered`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const resData = await response.json();
  return resData;
}

export async function GetSocialAll() : Promise<SocialMediaPostClass[]> {
  const { token, userID } = getUserCredentials();
  const response = await fetch(`${siteLink}SocialMediaPost/GetAllFeed`, {
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

export async function GetSocialFollowings() : Promise<SocialMediaPostClass[]> {
  const { token, userID } = getUserCredentials();
  const response = await fetch(`${siteLink}SocialMediaPost/GetFollowingsFeed`, {
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

export async function GetSocialFiltered(contains : string | undefined) : Promise<SocialMediaPostClass[]> {
  const { token, userID } = getUserCredentials();
  const response = await fetch(`${siteLink}SocialMediaPost/GetFeedByContent?contains=${contains}`, {
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

export async function AddSocial(content: string, isAnonymous : boolean, images : String[], ) : Promise<void> {
  const { token, userID } = getUserCredentials();
  console.log(images);
  const response = await fetch(`${siteLink}SocialMediaPost/Add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(
      {contentText : content,
      images: images,
    isAnonymous: isAnonymous}
    )
    });
    
      if (!response.ok) {
          throw new Error('Failed to add like');
        }
}

export async function AddSale(content: string, images : String[], postType: Number, Category: Number, price: Number) : Promise<void> {
 console.log(content)
 console.log(images)
 console.log(postType)
 console.log(Category)
 console.log(price)
  const { token, userID } = getUserCredentials();
  const response = await fetch(`${siteLink}SalePost/Add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(
      {contentText : content,
         images: images,
         postType: postType,
         price: price,
        category: Category}
    )
    });
    
      if (!response.ok) {
          throw new Error('Failed to add like');
        }
}

export async function DeletePost(postID: string): Promise<void> {
  const { token, userID } = getUserCredentials();
  const response = await fetch(`${siteLink}SocialMediaPost/Remove?postID=${postID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const response2 = await fetch(`${siteLink}SalePost/Remove?postID=${postID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  
}

export async function SearchUser(contains : String) : Promise<userSendRequest[]> {
  const response = await fetch(`${siteLink}User/SearchUser?contains=${contains}`, {
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