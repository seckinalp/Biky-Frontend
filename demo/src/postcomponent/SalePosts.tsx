
import React from 'react';
import SalePost, { SalePostClass } from './SalePost';


export interface SalePostsProps {
  initialPosts: SalePostClass[];
}

const SalePosts: React.FC<SalePostsProps> = ({ initialPosts }) => {
  return (
    <div>
      {initialPosts.map((post,index)=> (
        <div key={index} style={{ marginBottom: '16px' }}>
          <SalePost item={post}  />
        </div>
      ))}
    </div>
  );
}

export default SalePosts;
