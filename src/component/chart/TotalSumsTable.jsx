import React from "react";
import styled from "styled-components";

// Styled components
const TotalsTable = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
`;

const TotalsRow = styled.tr`
  background-color: #f1f1f1;
`;

const TotalsHeader = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
`;

const TotalsCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const TotalSumsTable = ({ data }) => {
  // Determine the keys for numeric values
  const sumKeys =
    data.length > 0
      ? Object.keys(data[0]).filter((key) => typeof data[0][key] === "number")
      : [];

  // Calculate totals for each numeric key
  const calculateTotals = () => {
    return sumKeys.reduce((totals, key) => {
      totals[key] = data.reduce((sum, item) => sum + (item[key] || 0), 0);
      return totals;
    }, {});
  };

  const totals = calculateTotals();

  return (
    <TotalsTable>
      <thead>
        <TotalsRow>
          {sumKeys.map((key) => (
            <TotalsHeader key={key}>{key.toUpperCase()}</TotalsHeader>
          ))}
        </TotalsRow>
      </thead>
      <tbody>
        <TotalsRow>
          {sumKeys.map((key) => (
            <TotalsCell key={key}>{totals[key]}</TotalsCell>
          ))}
        </TotalsRow>
      </tbody>
    </TotalsTable>
  );
};

export default TotalSumsTable;
