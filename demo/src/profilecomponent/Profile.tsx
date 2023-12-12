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
      const [editData, setEditData] = useState({
        username: props.item.username,
        password: props.item.password,
        bioInfo: props.item.bioInfo,       
      }); // Temporary state for editing
      // Function to toggle editing mode
      const toggleEdit = () => {
        setEditData(profileData); // Reset edit data to original profile data
        setIsEditing((prev) => !prev);
      };
      const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setProfileData(editData); // Update the main profile data
        setIsEditing(false); // Close the EditProfile form
        // Validation and submit logic goes here
      };

      const handleEditChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditData({ ...editData, [event.target.name]: event.target.value });
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
                value={editData.username}
                onChange={handleEditChange}
                placeholder="New Username"
            />
            <input
                type="password"
                name="password"
                value={editData.password}
                onChange={handleEditChange}
                placeholder="New Password"
            />
            <input
                type="password"
                name="confirmPassword"
                value={editData.password}
                onChange={handleEditChange}
                placeholder="Confirm New Password"
            />
            <textarea
                name="bioInfo"
                value={editData.bioInfo}
                onChange={handleEditChange}
                placeholder="New Bio"
            />
            <button type="submit" onClick={() => setIsEditing(true)}>Save Changes</button>
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
