
import React from 'react';
import SalePost from './SalePost';
import { SalePostProps } from './SalePost';

export interface SalePostsProps {
  initialPosts: SalePostProps[];
}

const SocialMediaPosts: React.FC<SalePostsProps> = ({ initialPosts }) => {
  return (
    <div>
      {initialPosts.map((post,index)=> (
        <div key={index} style={{ marginBottom: '16px' }}>
          <SalePost item={post.item}  />
        </div>
      ))}
    </div>
  );
}

export default SocialMediaPosts;
