import React, { useState } from "react";
import "./Homepage.css";
import Navbar from "./navigation/Navbar";
import Timeline from "./timeline/Timeline";

const Homepage: React.FC = () => {
  const [isRectangleVisible, setIsRectangleVisible] = useState(false);

  const handleCreateClick = () => {
    setIsRectangleVisible((prevState) => !prevState);
  };

  return (
    <div className='app'>
      <div className='background'></div>
      <div className="homepage">
        <div className="app__homepage">
   
        <div className="homepage__timeline">
        
        </div>
      </div>
      </div>
        

    </div>
      
  );
};

export default Homepage;