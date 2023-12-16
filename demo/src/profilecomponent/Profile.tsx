// Profile.tsx
import React, { useState } from 'react';
import './Profile.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';

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
    profileImage: string 

  }
  
const Profile: React.FC<ProfileProps> = (props) => {
  const [followersCount, setFollowersCount] = useState(props.item.followersNumber);
    const[isFollowed, setisFollowed] = useState(true)//Backend Handled
    const vieweuserID = useSelector((state: RootState) => state.auth.userID);

    //const [confirmPasswordError, setConfirmPasswordError] = useState('');
    //const [passwordError, setPasswordError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const[isOwnnProfile,setisOwnProfile] = useState(true)//vieweuserID == props.item.userID

    const [profileData, setProfileData] = useState({
      nickname: props.item.nickname,
      //password: props.item.password,
      //confirmPassword: props.item.password,
      description: props.item.description,
      profileUrl: props.item.profileImage
    });
    const [editData, setEditData] = useState({
      nickname: props.item.nickname,
      //password: props.item.password,
      //confirmPassword: props.item.password,
      description: props.item.description,
      profileUrl: props.item.profileImage       
    }); // Temporary state for editing
    // Function to toggle editing mode
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditData(prevState => ({ ...prevState, profileUrl: reader.result as string }));
        };
        reader.readAsDataURL(file);
      }
    };
    const toggleEdit = () => {
      //setPasswordError("");
      //setConfirmPasswordError("");
      //editData.confirmPassword = profileData.password;
      setEditData(profileData); // Reset edit data to original profile data
      setIsEditing((prev) => !prev);
    };
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      //if(editData.password === editData.confirmPassword && editData.password.length >7) {
        setProfileData(editData);
        setIsEditing(false);
      //} 
      //else {
        /*
        if(editData.password.length <8) {
          setPasswordError("Password less than 8 Characters")
          setIsEditing(true);
        }
        if(editData.password !== editData.confirmPassword){
          setConfirmPasswordError('Passwords do not match');
          setIsEditing(true);
        }
      }
      */
    };
    const handleEditChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      /*
      if (name === 'password') {
        editData.confirmPassword = "";
        setPasswordError("");
        setConfirmPasswordError("");
      }
      if (name === 'confirmPassword') { // Adjust according to your field names
        setPasswordError("");
        setConfirmPasswordError("");
      }
      */
      
      setEditData({ ...editData, [name]: value });
    };
    console.log(profileData);
    
    const handleFollowClick = () => {
      console.log("Follow button clicked");
      setisFollowed(true);
      setFollowersCount(prevCount => prevCount + 1); // Increment followers count
      // You might want to make an API call here
    };
  
    const handleUnfollowClick = () => {
      console.log("Unfollow button clicked");
      setisFollowed(false);
      setFollowersCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
      // You might want to make an API call here
    };
  
    const handleMessageClick = () => {
      // Logic for messaging the user
      console.log("Message button clicked");
      // Implement your message handling logic here
    };
    
  return (
    <>
      {isEditing ? (
        <form className="edit-form" onSubmit={handleSubmit}>
            <div className="edit-profile-header">
                <h2>Edit Profile</h2>
                <button className="close-button1" onClick={toggleEdit}>×</button>
            </div>
            <input
                type="text"
                name="username"
                value={editData.nickname}
                onChange={handleEditChange}
                placeholder="New Username"
            />
            {/* 
              <input
                  type="password"
                  name="password"
                  value={editData.password}
                  onChange={handleEditChange}
                  placeholder="New Password"
                  style={{ marginBottom: passwordError !== '' ? '1px' : '20px' }}
              />
              {passwordError && <p className="error-message">{passwordError}</p>}

              <input
                  type="password"
                  name="confirmPassword"
                  value={editData.confirmPassword}
                  onChange={handleEditChange}
                  placeholder="Confirm New Password"
                  style={{ marginBottom: confirmPasswordError !== '' ? '1px' : '20px' }}
              />
              {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
            */}

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
      <img className="profile-avatar" src={profileData.profileUrl ||"../../public/profile.png" } alt={profileData.nickname} />
        <h1 className="profile-name">{profileData.nickname}</h1>
        <div 
          className="profile-bio" 
          dangerouslySetInnerHTML={{ __html: profileData.description.replace(/\n/g, '<br />') }}
        />
        <div className="profile-stats">
          <span className="profile-stat"><strong>{props.item.postNumber}</strong> Posts</span>
          <span className="profile-stat"><strong>{props.item.followingsNumber}</strong> Following</span>
          <span className="profile-stat"><strong>{followersCount}</strong> Followers</span>
          <span className="profile-stat"><strong>{props.item.likeNumber}</strong> likeNumber</span>
        </div>
        {
            !isOwnnProfile ? (
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
    </div>
    )}
    </>
  );
};

Profile.defaultProps = {
    item: {
      userID: '1111',
      profileImage: '../../public/profile.png',
      nickname: 'elon.musk',
      postNumber: 3,
      followingsNumber: 27,
      followersNumber: 207,
      likeNumber: 1200,
      description: 'Computer Science Student',
    },
  };

export default Profile;
