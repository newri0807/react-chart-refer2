import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{ background: "#fff", padding: "2%" }}
      >
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">11</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
