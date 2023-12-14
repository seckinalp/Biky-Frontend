// Profile.tsx
import React, { useState } from 'react';
import './Profile.css';

export interface ProfileProps {
    item: {
          userId: string
          universityId: string
          photoUrl: string
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
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
      const [passwordError, setPasswordError] = useState('');
      const [isEditing, setIsEditing] = useState(false);

      const [profileData, setProfileData] = useState({
        username: props.item.username,
        password: props.item.password,
        confirmPassword: props.item.password,
        bioInfo: props.item.bioInfo,
        profileUrl: props.item.photoUrl
      });
      const [editData, setEditData] = useState({
        username: props.item.username,
        password: props.item.password,
        confirmPassword: props.item.password,
        bioInfo: props.item.bioInfo,
        profileUrl: props.item.photoUrl       
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
        setPasswordError("");
        setConfirmPasswordError("");
        editData.confirmPassword = profileData.password;
          setEditData(profileData); // Reset edit data to original profile data
        

        
        setIsEditing((prev) => !prev);
      };
      const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if(editData.password === editData.confirmPassword && editData.password.length >7) {
          setProfileData(editData);
          setIsEditing(false);
        } 
        else {
          if(editData.password.length <8) {
            setPasswordError("Password less than 8 Characters")
            setIsEditing(true);
          }
          if(editData.password !== editData.confirmPassword){
            setConfirmPasswordError('Passwords do not match');
            setIsEditing(true);
          }
        }
        
        
      };

      const handleEditChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (name === 'password') {
          editData.confirmPassword = "";
          setPasswordError("");
          setConfirmPasswordError("");
        }
        if (name === 'confirmPassword') { // Adjust according to your field names
          setPasswordError("");
          setConfirmPasswordError("");
        }
        
        setEditData({ ...editData, [name]: value });
      };
      console.log(profileData);
    
      // If in editing mode, render the EditProfile component
    
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
                style={{ marginBottom: passwordError !== '' ? '1px' : '20px' }} // Adjust the values as needed

            />
          {passwordError && <p className="error-message">{passwordError}</p>} {/* Display error message if passwords do not match */}
            <input
                type="password"
                name="confirmPassword"
                value={editData.confirmPassword}
                onChange={handleEditChange}
                placeholder="Confirm New Password"
                style={{ marginBottom: confirmPasswordError !== '' ? '1px' : '20px' }} // Adjust the values as needed

            />
          {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>} {/* Display error message if passwords do not match */}

            <textarea
                name="bioInfo"
                value={editData.bioInfo}
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
      <img className="profile-avatar" src={profileData.profileUrl ||"../../public/profile.png" } alt={profileData.username} />
        <h1 className="profile-name">{profileData.username}</h1>
        <div 
          className="profile-bio" 
          dangerouslySetInnerHTML={{ __html: profileData.bioInfo.replace(/\n/g, '<br />') }}
        />
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
      photoUrl: '../../public/profile.png',
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
