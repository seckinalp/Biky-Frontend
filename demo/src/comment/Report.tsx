import React, { useState } from 'react';
import './Report.css';



export interface ReportProps{
    item:{
        authorID: string,
        reportedID: string,
        reportType: number,
        reportCategory: string,
        reportData: string,
    }
    isVisable: boolean;
    onVisibilityChange: (visible: boolean) => void; // Callback to change visibility
}

export interface ReportClass  {
    
        authorID: string,
        reportedID: string,
        reportType: number,
        reportCategory: string,
        reportData: string,
    
}
const Report: React.FC<ReportProps> = ({item,isVisable, onVisibilityChange}) => {
    
    const [dataReport, setDataReport] = useState({
        authorID: item.authorID,
        reportedID: item.reportedID,
        reportType: item.reportType,
        reportCategory: item.reportCategory,
        reportData: '',
    }); 
    
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDataReport({ ...dataReport, reportData: event.target.value });
    };
    const handleReportSubmit = () => {
        
        onVisibilityChange(false);
        //setIsReportVisible(false); // Hide the report form
        // Here you would handle the report submission to your backend
      };


      const handleReportClose = () => {
        setDataReport({ ...dataReport, reportData: "" });
        onVisibilityChange(false); // Set visibility to false when closing
      }

    // You can implement the logic for handling reports here
  
    if (!isVisable) return null;

    return (
        <div className="reportr-container">
            <div className="reportr-header">
                <button className="reportr-back-button" onClick={handleReportClose}>
                   X
                </button>
                <span>Report Details</span>
            </div>

            <div className="reportr-form">
                <div className="report-textarea-container">
                    <textarea
                        value={dataReport.reportData}
                        onChange={handleInputChange}
                        placeholder="Update the report details..."
                    ></textarea>
                </div>
                <div className="report-button-container">
                    <button className="btn" onClick={handleReportSubmit}>Submit Report</button>
                </div>
            </div>
        </div>
    );
  };
  
  export default Report;