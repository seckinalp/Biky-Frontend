import React from "react";
import "./Timeline.css";

interface TimelineProps {
  isRectangleVisible: boolean;
  setIsRectangleVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timeline: React.FC<TimelineProps> = ({ isRectangleVisible, setIsRectangleVisible }) => {
  const handleCreateClick = () => {
    setIsRectangleVisible((prevState) => !prevState);
  };

  return (
    <div className="timeline">
      <div className="timeline__left">left</div>
      <div className="timeline__middle">
        <div className={`timeline__rectangle ${isRectangleVisible ? "visible" : ""}`}></div>
        <button className="timeline__create-button" onClick={handleCreateClick}>
          Cancel
        </button>
      </div>
      <div className="timeline__right">right</div>
    </div>
  );
};

export default Timeline;