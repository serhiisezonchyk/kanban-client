import React from "react";

function ProgressBar({max, value}) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <progress
        style={{ display: "flex", marginLeft: "12px" }}
        id="file"
        max={max}
        value={value}
      />
      <p style={{ margin: "0px 0px 0px 10px" }}>
        {value}/{max}
      </p>
    </div>
  );
}

export default ProgressBar;
