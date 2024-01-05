import React from "react";
import PropTypes from "prop-types";

const TooltipContainer = "bg-white border border-gray-300 p-4 shadow-md";

const TooltipItem = "m-0";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`custom-tooltip ${TooltipContainer}`}>
        <p
          className={`${TooltipItem} text-black`}
          style={{ margin: "10px 0" }}
        >{`Name: ${payload[0].payload.name}`}</p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            style={{ color: entry.color }}
          >{`${entry.name}: ${entry.value} `}</p>
        ))}
      </div>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
};

export default CustomTooltip;
