import React from "react";
import './ProgressBar.css';

const ProgressBar = ({ current, total }) => {
    const percentage = ((current+1) / total) * 100;

    return (
        <div className="progress-bar-container">
            <div
                className="progress-bar-fill"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
