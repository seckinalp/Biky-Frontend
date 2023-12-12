// Profile.tsx
import React, { useState } from 'react';
import './Profile.css';
import EditProfile from './editprofile/EditProfile.tsx'; // Import the EditProfile component

export interface ProfileProps {
    item: {
          userId: string
          universityId: string

            username: string
            email: string
            password: string
            postNum: string
            following: string
            followers: string
            likes: string
            bioInfo: string
          }
  }
  
const Profile: React.FC<ProfileProps> = (props) => {
  
      const [isEditing, setIsEditing] = useState(false);

      const [profileData, setProfileData] = useState({
        username: props.item.username,
        password: props.item.password,
        bioInfo: props.item.bioInfo,
      });
      // Function to toggle editing mode
      const toggleEdit = () => {
        setIsEditing((prev) => !prev);
      };
      const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Validation and submit logic goes here
      };
      const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfileData({ ...profileData, [event.target.name]: event.target.value });
      };
    
      // If in editing mode, render the EditProfile component
    
  return (
    <>
      {isEditing ? (
        <form className="register-form" onSubmit={handleSubmit}>
            <div className="edit-profile-header">
                <h2>Edit Profile</h2>
                <button className="close-button1" onClick={toggleEdit}>×</button>
            </div>
            <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleChange}
                placeholder="New Username"
            />
            <input
                type="password"
                name="password"
                value={profileData.password}
                onChange={handleChange}
                placeholder="New Password"
            />
            <input
                type="password"
                name="confirmPassword"
                value={profileData.password}
                onChange={handleChange}
                placeholder="Confirm New Password"
            />
            <textarea
                name="bioInfo"
                value={profileData.bioInfo}
                onChange={handleChange}
                placeholder="New Bio"
            />
            <button type="submit" onClick={toggleEdit}>Save Changes</button>
        </form>
      ) : (
    <div className="profile-card">
      <div className="profile-header">
      </div>
      <div className="profile-info">
        <img className="profile-avatar" src="../../public/profile.png" alt="Elon Musk" />
        <h1 className="profile-name">{profileData.username}</h1>
        
        <p className="profile-bio">{profileData.bioInfo}</p>
        <div className="profile-stats">
          <span className="profile-stat"><strong>{props.item.postNum}</strong> Posts</span>
          <span className="profile-stat"><strong>{props.item.following}</strong> Following</span>
          <span className="profile-stat"><strong>{props.item.followers}</strong> Followers</span>
          <span className="profile-stat"><strong>{props.item.likes}</strong> Likes</span>
        </div>
        <button className="profile-edit-button"onClick={toggleEdit}>Edit Profile</button>
      </div>
    </div>
    )}
    </>
  );
};

Profile.defaultProps = {
    item: {
      userId: '1111',
      universityId: '1111',
      username: 'elon.musk',
      email: 'mehmet.dedeler@ug.bilkent.edu.tr',
      password: '12345678',
      postNum: '3',
      following: '27',
      followers: '207',
      likes: '1200',
      bioInfo: 'Computer Science Student',
    },
  };

export default Profile;
