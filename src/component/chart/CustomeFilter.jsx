import React, { useEffect, useState } from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const FilterButton = styled.button`
  margin-right: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
`;

const FilterDateInput = styled.input`
  margin-right: 10px;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const FilterDateLabel = styled.label`
  margin-right: 5px;
`;

const FilterDateWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SelectBox = styled.select`
  margin: 0 10px;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchInput = styled.input`
  margin-right: 20px;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CustomFilter = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  filterData,
  setInitialDates,
  setSearchTerm,
}) => {
  const [selectedInterval, setSelectedInterval] = useState("");

  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0];
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 6);
    const futureDateString = futureDate.toISOString().split("T")[0];

    setStartDate(currentDateString);
    setEndDate(futureDateString);
  }, []);

  const calculateNewEndDate = (interval) => {
    const currentDate = new Date();
    let initialEndDate = currentDate.toISOString().split("T")[0]; // Current date

    switch (interval) {
      case "select":
        // End date remains unchanged
        break;
      case "oneday":
        // End date remains unchanged
        break;
      case "onemonth":
        currentDate.setMonth(currentDate.getMonth() + 1);
        initialEndDate = currentDate.toISOString().split("T")[0];
        break;
      case "oneyear":
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        initialEndDate = currentDate.toISOString().split("T")[0];
        break;
      default:
        // End date remains unchanged
        break;
    }

    setEndDate(initialEndDate);
  };

  useEffect(() => {
    calculateNewEndDate(selectedInterval);
  }, [selectedInterval]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <FilterContainer>
      <SearchInput
        type="text"
        placeholder="Search by name"
        onChange={handleSearchInputChange}
      />

      <FilterDateWrapper>
        <FilterDateLabel>Start Date:</FilterDateLabel>
        <FilterDateInput
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </FilterDateWrapper>
      <FilterDateWrapper>
        <FilterDateLabel>End Date:</FilterDateLabel>
        <FilterDateInput
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </FilterDateWrapper>
      <FilterButton onClick={() => filterData(selectedInterval)}>
        Apply
      </FilterButton>
      <SelectBox value={selectedInterval} onChange={handleIntervalChange}>
        <option value="">select</option>
        <option value="oneday">One Day</option>
        <option value="onemonth">One Month</option>
        <option value="oneyear">One Year</option>
      </SelectBox>
    </FilterContainer>
  );
};

export default CustomFilter;
