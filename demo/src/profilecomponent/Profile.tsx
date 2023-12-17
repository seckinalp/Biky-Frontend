// Profile.tsx
import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { getUserCredentials } from '../logic/cookie';
import { AddFollow, CheckFollow, FetchProfile, OpenChat, RemoveFollow, SendMessage, UpdateProfile, UploadFile, imageLink } from '../logic/backend';
import { useParams } from 'react-router-dom';
import EditProfile from './editprofile/EditProfile';
import ProfileFeed from './ProfileFeed';

export interface ProfileProps {
    item: ProfileClass,
  }

  export interface ProfileClass{
    followingsNumber: number
    followersNumber: number
    postNumber: number
    likeNumber: number
    description: string
    userID: string
    nickname: string
    profileImage: string | null
  }
  
const Profile: React.FC = () => {
  const[data, setData] = useState<ProfileClass>();
  const [followersCount, setFollowersCount] = useState(0);
  const[isFollowed, setisFollowed] = useState(true)//Backend Handled
  const { userID : vieweuserID} = getUserCredentials();
    const [isEditing, setIsEditing] = useState(false);
    //const[isOwnnProfile,setisOwnProfile] = useState(false); //vieweuserID == data?.userID
    const [loading, setLoading] = useState<boolean>(true);
    const [reload, setReload] = useState<boolean>(true);
    const [update, setUpdate] = useState<boolean>(false);
    const [invalid, setInvalid] = useState<boolean>(false);
    const { userID : paramName } = useParams();
      
    useEffect(() => {
      const fetchData = async () => {
        try {
          if(paramName) {
            console.log("Reloaded");
          const result = await FetchProfile(paramName);
          handleData(result);
          if(result?.followersNumber) setFollowersCount(result.followersNumber);
          console.log(data?.followersNumber + "dshfs")
          const f = await CheckFollow(paramName);
          setisFollowed(f);
        }
        } catch (error) {
          console.error('Error fetching profile:', error);
          setInvalid(true);

        } finally {
          setLoading(false);
        }
      };
      
      if (reload) {
        
        fetchData();
        setReload(false); 
      }
    }, [reload, paramName]); 

    useEffect(() => {
      const fetchData = async () => {
        try {
          if(paramName) {
            console.log("Reloaded");
          await UpdateProfile(editData.nickname, editData.profileUrl, editData.description);
        }
        } catch (error) {
          console.error('Error updating profile:', error);

        }
      };
      
      if (update) {
        fetchData();
        setUpdate(false); 
      }
    }, [update]); 

    const reloadComments = () => {
      setReload(true);
    };

    const handleData = (data: ProfileClass) => {
      setData(data);
    };

    const [editData, setEditData] = useState({
      nickname: "",
      description: "",
      profileUrl: ""   
    }); // Temporary state for editing
    // Function to toggle editing mode
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
    
        try {
          // Upload the file and get the image URL
          const imageUrl = await UploadFile(file);
    
          // Update the state with the image URL
          setEditData(prevState => ({ ...prevState, profileUrl: imageUrl }));
        } catch (error) {
          // Handle errors, e.g., show an error message
          console.error("Error uploading file:", error);
        }
      }
    };
    const toggleEdit = () => {
      if(data?.nickname && data?.description && data?.profileImage)
      setEditData({nickname :data?.nickname, description: data?.description, profileUrl: data?.profileImage}); // Reset edit data to original profile data
      setIsEditing((prev) => !prev);
    };
    const handleSubmit = async (event: React.FormEvent) => {
      //event.preventDefault();
      try {
        // Assuming UpdateProfile returns a promise
        setIsEditing(false);
        await setUpdate(true);
        await setReload(true);
      } catch (error) {
        // Handle the error (e.g., show an error message)
        console.error("Error updating profile:", error);
      }
    };
    
    const handleEditChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      
      setEditData({ ...editData, [name]: value });
    };
    
    const handleFollowClick = async () => {
      try {
        setisFollowed(true);
    
        if(data) await AddFollow(data?.userID);
    
        setFollowersCount(prevCount => prevCount + 1); // Increment followers count
      } catch (error) {
        console.error("Error following:", error);
      }
    };
    
  
    const handleUnfollowClick = async () => {
      try {
        setisFollowed(false);
        
        if(data) await RemoveFollow(data?.userID);
        
        setFollowersCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
      } catch (error) {
        console.error("Error unfollowing:", error);
      }
    };
  
    const handleMessageClick = () => {
      try {
        if(paramName) OpenChat(paramName);
      } catch (error) {
        console.error("Error opening chat :", error);
      }
    };
    
  return (
    <>
      {isEditing ? (
        <form className="edit-form" onSubmit={handleSubmit}>
            <div className="edit-profile-header">
                <h2>Edit Profile</h2>
                <button className="close-button1" onClick={toggleEdit}>×</button>
            </div>
            <textarea
                name="nickname"
                value={editData.nickname}
                onChange={handleEditChange}
                placeholder="New User Name"
                maxLength={32}
            />

            <textarea
                name="description"
                value={editData.description}
                onChange={handleEditChange}
                placeholder="New Bio"
                maxLength={200}
            />
            <label htmlFor="profilePhoto" className="upload-button">
              Upload new Profile Photo
            </label>
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleFileChange}
              />
            <button type="submit" onClick={() => setIsEditing(true)}>Save Changes</button>
        </form>
      ) : (
    <div className="profile-card">
      <div className="profile-header">
      </div>
      <div className="profile-info">
      <img className="profile-avatar" src={data?.profileImage == "" || data?.profileImage == null ? "../../public/ppdefault.jpg" : `${imageLink}${data?.profileImage}`} alt={data?.nickname} />
        <h1 className="profile-name">{data?.nickname}</h1>
        {data?.description && <div 
          className="profile-bio" 
          dangerouslySetInnerHTML={{  __html: data?.description.replace(/\n/g, '<br />') }}
        />}
        <div className="profile-stats">
          <span className="profile-stat"><strong>{data?.postNumber}</strong> Posts</span>
          <span className="profile-stat"><strong>{data?.followingsNumber}</strong> Following</span>
          <span className="profile-stat"><strong>{followersCount}</strong> Followers</span>
          <span className="profile-stat"><strong>{data?.likeNumber}</strong> likeNumber</span>
        </div>
        {
            !(data?.userID && vieweuserID == data?.userID) ? (
            <div className="profile-button-container">
              {!isFollowed ?(
                <button onClick={handleFollowClick} className="profile-follow-button">Follow</button>
              ) :(
                <button onClick={handleUnfollowClick} className="profile-unfollow-button">Unfollow</button>
              )
              }
              <button onClick={handleMessageClick} className="profile-message-button">Message</button>
            </div>
            ) : (
              <button className="profile-edit-button" onClick={toggleEdit}>Edit Profile</button>
            )
          }
      </div>
      {paramName && <ProfileFeed userID = {paramName}/> }
    </div>
    )}

    </>
  );
};


export default Profile;
