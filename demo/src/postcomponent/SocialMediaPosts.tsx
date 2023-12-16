
import React from 'react';
import SocialMediaPost, { SocialMediaPostProps } from './SocialMediaPost';

export interface SocialMediaPostsProps {
  initialPosts: SocialMediaPostProps[];
}

const SocialMediaPosts: React.FC<SocialMediaPostsProps> = ({ initialPosts }) => {
  return (
    <div>
      {initialPosts.map((post ,index) => (
        <div key={index} style={{ marginBottom: '16px' }}>
        <SocialMediaPost item={post.item} />
        </div>
      ))}
    </div>
  );
}

export default SocialMediaPosts;
