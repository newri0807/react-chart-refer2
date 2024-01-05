import React from "react";

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
    <table className="w-full mt-20 border-collapse">
      <tbody>
        <tr className="bg-gray-300">
          <th className="p-2 border border-gray-400" rowSpan="2">
            Total
          </th>
          {sumKeys.map((key) => (
            <th key={key} className="p-2 border border-gray-400">
              {key.toUpperCase()}
            </th>
          ))}
        </tr>
        <tr className="bg-gray-300">
          {sumKeys.map((key) => (
            <td key={key} className="p-2 border border-gray-400 text-center">
              {totals[key]}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default TotalSumsTable;
