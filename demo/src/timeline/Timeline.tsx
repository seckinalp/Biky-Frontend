import React from "react";
import "./Timeline.css";



const Timeline: React.FC = () => {

  return (
    <div className="timeline">
      <div className="timeline__left">left</div>
      <div className="timeline__middle">
        middle
      </div>
      <div className="timeline__right">right</div>
    </div>
  );
};

export default Timeline;