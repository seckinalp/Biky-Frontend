import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/Forgot';
import Posts from './pages/Posts';
import Comments from "./comment/Comments"
import SocialMediaPosts, {} from './postcomponent/SocialMediaPosts';
import { SalePostProps } from './postcomponent/SalePost';
import { Provider } from 'react-redux';
import store from './store'; 
import CategorySelect from './assets/categoryComponent/CategorySelect';
import SalePosts from './postcomponent/SalePosts';
import Profile from './profilecomponent/Profile';

interface Category {
  categoryID: number;
  name: string;
  children: Category[];
}


const sampleSalePosts: SalePostProps[] = [
  {
    item: {
      postType: 1, // Example post type
      price: 100.00, // Example price
      categoryID: 123, // Example category ID
      postID: 'post123', // Example post ID
      authorID: 'author123', // Example author ID
      contentText: 'This is a sample sale post.', // Example content text
      images: ['image1.jpg', 'image2.jpg'], // Example images
      author: {
        userID: 'user123',
        nickname: 'SampleUser',
        profileImage: 'profileImage.jpg', // Example profile image
      },
      postTime: new Date().toISOString(), // Current time as an example
    },
    isAnonymous: false,
  },{
    item: {
      postType: 1, // Example post type
      price: 100.00, // Example price
      categoryID: 123, // Example category ID
      postID: 'post123', // Example post ID
      authorID: 'author123', // Example author ID
      contentText: 'This is a sample sale post.', // Example content text
      images: ['image1.jpg', 'image2.jpg'], // Example images
      author: {
        userID: 'user123',
        nickname: 'SampleUser',
        profileImage: 'profileImage.jpg', // Example profile image
      },
      postTime: new Date().toISOString(), // Current time as an example
    },
    isAnonymous: false,
  },{
    item: {
      postType: 1, // Example post type
      price: 100.00, // Example price
      categoryID: 123, // Example category ID
      postID: 'post123', // Example post ID
      authorID: 'author123', // Example author ID
      contentText: 'This is a sample sale post.', // Example content text
      images: ['image1.jpg', 'image2.jpg'], // Example images
      author: {
        userID: 'user123',
        nickname: 'SampleUser',
        profileImage: 'profileImage.jpg', // Example profile image
      },
      postTime: new Date().toISOString(), // Current time as an example
    },
    isAnonymous: false,
  }
  // ... more items if needed
];
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
        <div>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/posts" element={<Posts></Posts>} />
        <Route path='/comments' element={<Comments postID={"bbd0a675-9c1e-46ec-b774-f2f952694dc2"}/>}/>
        <Route path='/profile/:userID' element={<Profile />}/>
    
     
        </Routes>
        </div>

      </div>
    
    </Router>
  </Provider>
);
};

export default App;
