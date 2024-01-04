import React, { useState } from "react";
import styled from "styled-components";
import TotalSumsTable from "./TotalSumsTable";

const CustomTable = ({ data, startDate, endDate, searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // You can adjust the number of items per page

  // Assuming all objects in the data array have the same keys
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

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
  const paginate = (pageNumber, event) => {
    event.preventDefault();
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
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(data[0] || {}).map((header) => (
              <TableHeader key={header}>{header.toUpperCase()}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <tbody>
          {data
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item, index) => (
              <TableRow key={index}>
                {Object.values(item).map((value, idx) => (
                  <TableCell key={idx}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
        </tbody>
      </Table>
      <PaginationNav>
        <ul>
          {pageNumbers.map((number) => (
            <PageItem key={number}>
              <PageLink onClick={(e) => paginate(number, e)}>{number}</PageLink>
            </PageItem>
          ))}
        </ul>
      </PaginationNav>
    </>
  );
};

// Styled components
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const PaginationNav = styled.nav`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const PageItem = styled.li`
  display: inline-block;
  margin-right: 5px;
`;

const PageLink = styled.button`
  border: none;
  padding: 8px 12px;
  background-color: #6c757d;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    background-color: #5a6268;
  }
  &:focus {
    outline: none;
  }
`;

export default CustomTable;
