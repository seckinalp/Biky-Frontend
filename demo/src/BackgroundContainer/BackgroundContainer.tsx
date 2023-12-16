import React, { ReactNode } from 'react';
import './BackgroundContainer.css'; // Import your background CSS file

interface BackgroundContainerProps {
  children: ReactNode;
}

const BackgroundContainer: React.FC<BackgroundContainerProps> = ({ children }) => {
  return (
    <div className="background">
      {children}
    </div>
  );
};

export default BackgroundContainer;
