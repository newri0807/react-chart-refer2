import React from "react";
import styled from "styled-components";

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const LegendColor = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background-color: ${(props) => (props.checked ? props.color : "transparent")};
  border: ${(props) =>
    props.checked ? "2px solid transparent" : `2px solid ${props.color}`};
`;

const CustomLegend = ({ showAmt, showPv, showUv, toggleShow }) => {
  return (
    <LegendContainer>
      <LegendItem onClick={() => toggleShow("amt")}>
        <LegendColor color="#8884d8" checked={showAmt} />
        Amt
      </LegendItem>
      <LegendItem onClick={() => toggleShow("pv")}>
        <LegendColor color="#413ea0" checked={showPv} />
        Pv
      </LegendItem>
      <LegendItem onClick={() => toggleShow("uv")}>
        <LegendColor color="#ff7300" checked={showUv} />
        Uv
      </LegendItem>
    </LegendContainer>
  );
};

export default CustomLegend;
