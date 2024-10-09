import React from "react";


interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = React.memo(
  ({ value = 0}) => {
    return (
      <div className="progress">
        <span style={{ color: value > 49 ? "white" : "black" }}>{value}%</span>
        <div
          className="progress-bar"
          style={{ width: `${value}%` }}
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={value}
        ></div>
      </div>
    );
  }
);

export default ProgressBar;
