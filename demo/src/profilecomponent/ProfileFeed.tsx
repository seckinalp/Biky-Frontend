import React, { useState, useEffect } from 'react';
import './Profile.css';
import { SocialMediaPostClass } from '../postcomponent/SocialMediaPost';
import { SalePostClass } from '../postcomponent/SalePost';
import { GetSaleUser, GetSocialUser } from '../logic/backend';
import SocialMediaPosts, { SocialMediaPostsProps } from '../postcomponent/SocialMediaPosts';
import SalePosts from '../postcomponent/SalePosts';
import "./ProfileFeed.css"
interface ProfileFeedProps {
  userID: string;
}

const ProfileFeed: React.FC<ProfileFeedProps> = ({ userID }) => {
    // States to manage whether the displayed posts are social media posts or sale posts
  const [isSocial, setisSocial] = useState(true);
  const [data, setData] = useState<SocialMediaPostClass[] | SalePostClass[]>([]);  // State to store the fetched posts
  const [loading, setLoading] = useState(true);  // State to manage the loading state
    
  useEffect(() => {
        // Fetching data depending on whether the user wants to see social or sale posts
    const fetchData = async () => {
      try {
        setLoading(true);
        if(isSocial) { 
            const result = await GetSocialUser(userID);// Fetching social media posts
            setData(result);
        } else {
            const result = await GetSaleUser(userID);// Fetching sale posts
            setData(result);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
      fetchData();
  }, [isSocial]); 
  // Function to show sale posts
  const toggleSale = () => {
    setisSocial(false);
  };
  // Function to show social media posts
  const toggleSocial = () => {
    setisSocial(true);
  };

  return (
    <>
  <div className="profile-button-container">
    <button 
      type="button" 
      onClick={toggleSocial} 
      className={`profile-edit-button ${isSocial ? 'active' : ''}`}
    >
      Social Media Posts
    </button>
    <button 
      type="button" 
      onClick={toggleSale} 
      className={`profile-edit-button ${!isSocial ?  'active' : ''}`}
    >
      Sale Posts
    </button>
  </div>
  <div className='profile-posts'>
  {isSocial ? <SocialMediaPosts initialPosts={data as SocialMediaPostClass[]} />: <SalePosts initialPosts={ data as SalePostClass[]}/>}
  </div>

    </>
  );
};

export default ProfileFeed;
