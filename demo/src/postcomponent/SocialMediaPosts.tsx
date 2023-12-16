
import React from 'react';
import SocialMediaPost, { SocialMediaPostProps } from './SocialMediaPost';

export interface SocialMediaPostsProps {
  initialPosts: SocialMediaPostProps[];
}

const SocialMediaPosts: React.FC<SocialMediaPostsProps> = ({ initialPosts }) => {
  return (
    <div>
      {initialPosts.map(post => (
        <SocialMediaPost item={post.item} />
      ))}
    </div>
  );
}

export default SocialMediaPosts;
