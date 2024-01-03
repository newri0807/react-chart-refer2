import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TooltipContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0px 0px 2px rgba(92, 92, 92, 0.2);
`;

const TooltipItem = styled.p`
  margin: 0;
  color: ${(props) => props.color};
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer className="custom-tooltip">
        <TooltipItem
          color="#000"
          style={{ margin: "10px 0" }}
        >{`Name: ${payload[0].payload.name}`}</TooltipItem>
        {payload.map((entry, index) => (
          <TooltipItem
            key={`item-${index}`}
            color={entry.color}
          >{`${entry.name}: ${entry.value}`}</TooltipItem>
        ))}
      </TooltipContainer>
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
