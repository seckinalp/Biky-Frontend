import React, { useState, useEffect } from 'react';
import './Profile.css';
import { SocialMediaPostClass } from '../postcomponent/SocialMediaPost';
import { SalePostClass } from '../postcomponent/SalePost';
import { GetSaleUser, GetSocialUser } from '../logic/backend';
import SocialMediaPosts, { SocialMediaPostsProps } from '../postcomponent/SocialMediaPosts';
import SalePosts from '../postcomponent/SalePosts';

interface ProfileFeedProps {
  userID: string;
}

const ProfileFeed: React.FC<ProfileFeedProps> = ({ userID }) => {
  const [isSocial, setisSocial] = useState(true);
  const [data, setData] = useState<SocialMediaPostClass[] | SalePostClass[]>([]);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if(isSocial) { 
            const result = await GetSocialUser(userID);
            setData(result);
        } else {
            const result = await GetSaleUser(userID);
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

  const toggleSale = () => {
    setisSocial(false);
  };

  const toggleSocial = () => {
    setisSocial(true);
  };

  return (
    <>
    <div className="profile-button-container">
      <button className="profile-edit-button" onClick={toggleSocial}>
        Social Media Posts
      </button>
      <button className="profile-edit-button" onClick={toggleSale}>
        Sale Posts
      </button>
    </div>
    {isSocial ? <SocialMediaPosts initialPosts={data as SocialMediaPostClass[]} />: <SalePosts initialPosts={ data as SalePostClass[]}/>}
    </>
  );
};

export default ProfileFeed;
