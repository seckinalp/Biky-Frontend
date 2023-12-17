
import React from 'react';
import SocialMediaPost, { SocialMediaPostClass } from './SocialMediaPost';

export interface SocialMediaPostsProps {
  initialPosts: SocialMediaPostClass[];
}

const SocialMediaPosts: React.FC<SocialMediaPostsProps> = ({ initialPosts }) => {
  return (
    <div>
      {initialPosts.map((post ,index) => (
        <div key={index} style={{ marginBottom: '16px' }}>
        <SocialMediaPost item={post} />
        </div>
      ))}
    </div>
  );
}

export default SocialMediaPosts;
