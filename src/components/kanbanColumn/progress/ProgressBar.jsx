import React from "react";
import './ProgressBar.scss';

function ProgressBar({max, value}) {
  return (
    <div className='progress-container'>
      <progress
        id="file"
        max={max}
        value={value}
      />
      <p>
        {value}/{max}
      </p>
    </div>
  );
}

export default ProgressBar;
