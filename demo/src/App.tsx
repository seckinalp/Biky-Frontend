import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/Forgot';
import Post from "./postcomponent/Post"
import Posts from './pages/Posts';
import Profile from './profilecomponent/Profile';
import CreatePost from './createPostComponent/CreatePost';
import Settings from './settingsComponent/Settings';
import { imageLink } from './logic/backend';
import Notifications from './notificationComponent/Notifications';
import Comments from "./comment/Comments"
import SocialMediaPost from './postcomponent/SocialMediaPost';
import SocialMediaPosts, { SocialMediaPostsProps } from './postcomponent/SocialMediaPosts';
import SalePost from './postcomponent/SalePost';
import { SalePostProps } from './postcomponent/SalePost';
import SalePosts, { SalePostsProps } from './postcomponent/SalePosts';
import { Provider } from 'react-redux';
import store from './store'; 
import CategoryFilter from './categoryFilterCompononet/CategoryFilter';

import SearchComponent from './SearchComponent/SearchComponent';
import ShowRow from './showRowComponent/ShowRow';

import bikyImage from './indir.jpg';
import Deneme from './categoryFilterCompononet/deneme';
import Navbar from './navigation/Navbar';
import BackgroundContainer from './BackgroundContainer/BackgroundContainer';
const exampleSalePostsProps: SalePostsProps = {
  initialPosts: [
    {
      item: {
        postID: "post1",
        author: {
          userID: "1234",
          userName: "John Doe",
          userProfileLink: "https://example.com/profile/user1"
        },
        imagesID: ["image1", "image2"],
        contentText: "This is the first post content",
        postTime: new Date("2023-12-16T12:00:00Z"),
        isAnonymous: false,
        initialComments: [
          {
            item: {
              commentId: "comment1",
              postId: "post1",
              author: {
                userID: "user2",
                userName: "Jane Doe",
                userProfileLink: "https://example.com/profile/user2"
              },
              contentText: "Great post!",
              commentTime: new Date("2023-12-16T12:30:00Z")
            },
            showDelete: false,
            onDelete: () => {
              console.log("Comment deleted");
            }
          },
          // ... more comments
        ],
        postType: 5,
        price: "13"
      }
    },
    {
      item: {
        postID: "post1",
        author: {
          userID: "1234",
          userName: "John Doe",
          userProfileLink: "https://example.com/profile/user1"
        },
        imagesID: ["image1", "image2"],
        contentText: "This is the first post content",
        postTime: new Date("2023-12-16T12:00:00Z"),
        isAnonymous: false,
        initialComments: [
          {
            item: {
              commentId: "comment1",
              postId: "post1",
              author: {
                userID: "user2",
                userName: "Jane Doe",
                userProfileLink: "https://example.com/profile/user2"
              },
              contentText: "Great post!",
              commentTime: new Date("2023-12-16T12:30:00Z")
            },
            showDelete: false,
            onDelete: () => {
              console.log("Comment deleted");
            }
          },
          // ... more comments
        ],
        postType: 5,
        price: "13"
      }
    },
    // ... more social media posts
  ]
};

interface Category {
  categoryID: number;
  name: string;
  children: Category[];
}

const exampleSocialMediaPostsProps: SocialMediaPostsProps = {
  initialPosts: [
    {
      item: {
        postID: "post1",
        author: {
          userID: "1234",
          userName: "John Doe",
          userProfileLink: "https://example.com/profile/user1"
        },
        imagesID: ["image1", "image2"],
        contentText: "This is the first post content",
        postTime: new Date("2023-12-16T12:00:00Z"),
        isLiked: true,
        isAnonymous: false,
        likecount: 150,
        initialComments: [
          {
            item: {
              commentId: "comment1",
              postId: "post1",
              author: {
                userID: "user2",
                userName: "Jane Doe",
                userProfileLink: "https://example.com/profile/user2"
              },
              contentText: "Great post!",
              commentTime: new Date("2023-12-16T12:30:00Z")
            },
            showDelete: false,
            onDelete: () => {
              console.log("Comment deleted");
            }
          },
          // ... more comments
        ]
      }
    },
    {
      item: {
        postID: "post1",
        author: {
          userID: "1234",
          userName: "John Doe",
          userProfileLink: "https://example.com/profile/user1"
        },
        imagesID: ["image1", "image2"],
        contentText: "This is the first post content",
        postTime: new Date("2023-12-16T12:00:00Z"),
        isLiked: true,
        isAnonymous: false,
        likecount: 150,
        initialComments: [
          {
            item: {
              commentId: "comment1",
              postId: "post1",
              author: {
                userID: "user2",
                userName: "Jane Doe",
                userProfileLink: "https://example.com/profile/user2"
              },
              contentText: "Great post!",
              commentTime: new Date("2023-12-16T12:30:00Z")
            },
            showDelete: false,
            onDelete: () => {
              console.log("Comment deleted");
            }
          },
          // ... more comments
        ]
      }
    },
    // ... more social media posts
  ]
};

const App = () => {
  const categoryData: Category[] = [
    {
      categoryID: 1,
      name: "string",
      children: [
        {
          categoryID: 2,
          name: "lesson",
          children: [
            {
              categoryID: 3,
              name: "cs",
              children: [
                { categoryID: 4, name: "cs223", children: [] },
                { categoryID: 5, name: "cs315", children: [] },
                { categoryID: 6, name: "cs319", children: [] }
              ]
            }
          ]
        }
      ]
    }
    // ... other categories
  ];

return (
  <Provider store={store}>
    <Router>
    
      <div>
      
        {/* Include the Navbar component here */}
        <div className='navbar_container'><Navbar  /></div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>
        <Routes>
        <Route path="/socialmediaposts" element={<SocialMediaPosts initialPosts={exampleSocialMediaPostsProps.initialPosts} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/posts" element={<Posts></Posts>} />
        <Route path="/post" element={<Post/>} /> {/* Updated this line */}
        <Route path="/create-post" element={<CreatePost/>} /> {/* Updated this line */}
        <Route path="/settings" element={<Settings/>} /> {/* Updated this line */}
        <Route path="/notifications" element={<Notifications notifications={[  { id: 1, time: '9:01 am', userName: 'Ahmet', text: 'followed you.', isSeen: false },
    { id: 2, time: '9:03 am', userName: 'Ayşe', text: 'liked your post.', isSeen: true },
    { id: 3, time: '9:07 am', userName: 'Mehmet', text: 'commented: Great work!', isSeen: false },]}/>} /> {/* Updated this line */}
        <Route path='/profile' element={<Profile />}/>
        <Route path='/saleposts' element={<SalePosts initialPosts ={exampleSalePostsProps.initialPosts}/>}/>
        <Route path='/comments' element={<Comments postID={"bbd0a675-9c1e-46ec-b774-f2f952694dc2"}/>}/>
        <Route path="/category" element={<CategoryFilter data={categoryData} />} />

        <Route path="/search" element={<SearchComponent />} />
        <Route path="/show-row" element={<ShowRow item={{
            id: 1,
            name: 'Elon Musk',
            avatarUrl: bikyImage
          }} onItemClick={function (id: number): void {
            throw new Error('Function not implemented.');
          } }/>} />
        </Routes>
        </div>

      </div>
    
    </Router>
  </Provider>
);
};

export default App;
