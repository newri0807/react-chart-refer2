import React, { useState } from "react";
import TotalSumsTable from "./TotalSumsTable";
import CustomPagenation from "./CustomPagenation";

const CustomTable = ({ data, startDate, endDate, searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // You can adjust the number of items per page

  const filteredData = data.filter((item) => {
    const dateInRange =
      !startDate ||
      !endDate ||
      (item.date >= startDate && item.date <= endDate);
    const termInName =
      !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return dateInRange && termInName;
  });

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <TotalSumsTable data={filteredData} />
      <table className="w-full border-collapse border-t border-gray-300 mt-20">
        <thead className="bg-gray-200">
          <tr>
            {Object.keys(data[0] || {}).map((header) => (
              <th key={header} className="p-2 border border-gray-300 text-left">
                {header.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              {Object.values(item).map((value, idx) => (
                <td key={idx} className="p-2 border border-gray-300">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <CustomPagenation
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default CustomTable;
