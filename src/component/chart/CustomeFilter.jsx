// import React, { useEffect, useState } from "react";

// const CustomFilter = ({
//   startDate,
//   setStartDate,
//   endDate,
//   setEndDate,
//   filterData,
//   setSearchTerm,
// }) => {
//   const [selectedInterval, setSelectedInterval] = useState("");

//   const handleIntervalChange = (event) => {
//     setSelectedInterval(event.target.value);
//   };

//   useEffect(() => {
//     const currentDate = new Date();
//     const currentDateString = currentDate.toISOString().split("T")[0];
//     const futureDate = new Date(currentDate);
//     futureDate.setDate(currentDate.getDate() + 6);
//     const futureDateString = futureDate.toISOString().split("T")[0];

//     setStartDate(currentDateString);
//     setEndDate(futureDateString);
//   }, []);

//   const calculateNewEndDate = (interval) => {
//     const currentDate = new Date();
//     let initialEndDate = currentDate.toISOString().split("T")[0]; // Current date

//     switch (interval) {
//       case "select":
//         // End date remains unchanged
//         break;
//       case "oneday":
//         // End date remains unchanged
//         break;
//       case "onemonth":
//         currentDate.setMonth(currentDate.getMonth() + 1);
//         initialEndDate = currentDate.toISOString().split("T")[0];
//         break;
//       case "oneyear":
//         currentDate.setFullYear(currentDate.getFullYear() + 1);
//         initialEndDate = currentDate.toISOString().split("T")[0];
//         break;
//       default:
//         // End date remains unchanged
//         break;
//     }

//     setEndDate(initialEndDate);
//   };

//   useEffect(() => {
//     calculateNewEndDate(selectedInterval);
//   }, [selectedInterval]);

//   useEffect(() => {
//     // Add the filtering logic here
//     filterData(selectedInterval);
//   }, [selectedInterval, filterData]);

//   const handleSearchInputChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div className="flex justify-start  p-2 rounded-lg mb-5">
//       {/* 단어 검색 */}
//       <input
//         type="text"
//         placeholder="이름 검색"
//         className="mr-5 p-1 border border-gray-300 rounded"
//         onChange={handleSearchInputChange}
//       />

//       {/* 기간검색 */}
//       <div className="flex items-center mr-5">
//         <label className="mr-1">Start Date:</label>
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="p-1 border border-gray-300 rounded"
//         />
//       </div>

//       <div className="flex items-center mr-5">
//         <label className="mr-1">End Date:</label>
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="p-1 border border-gray-300 rounded"
//         />
//       </div>

//       {/* 기간 검색2 */}
//       <select
//         value={selectedInterval}
//         onChange={handleIntervalChange}
//         className="mx-5 p-2 border border-gray-300 rounded"
//       >
//         <option value="">select</option>
//         <option value="oneday">One Day</option>
//         <option value="onemonth">One Month</option>
//         <option value="oneyear">One Year</option>
//       </select>
//     </div>
//   );
// };

import React, { useEffect, useState, useMemo } from "react";

const CustomFilter = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  filterData,
  searchTerm,
  setSearchTerm,
  searchTerm2,
  setSearchTerm2,
  inputConfigs,
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
    filterData(selectedInterval);
  }, [selectedInterval]);

  const handleInputChange = (name, value) => {
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    } else if (name === "searchTerm") {
      setSearchTerm(value);
    } else if (name === "searchTerm2") {
      setSearchTerm2(value);
    }
  };

  // Memoize the JSX elements representing filter inputs
  const filterInputs = useMemo(() => {
    return inputConfigs.map((config) => (
      <div key={config.name} className="flex items-center mr-5">
        {/* {config.label && <label className="mr-1">{config.label}:</label>} */}
        {config.type === "select" ? (
          <select
            value={selectedInterval}
            onChange={handleIntervalChange}
            className="p-1 border border-gray-300 rounded"
          >
            {config.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : config.type === "text" ? (
          <input
            type={config.type}
            value={
              (config.name === "searchTerm" ? searchTerm : "") ||
              (config.name === "searchTerm2" ? searchTerm2 : "")
            }
            onChange={(e) => handleInputChange(config.name, e.target.value)}
            className="p-1 border border-gray-300 rounded"
            placeholder={config.placeholder}
          />
        ) : (
          <input
            type={config.type}
            value={
              config.type === "date"
                ? config.name === "startDate"
                  ? startDate
                  : config.name === "endDate"
                  ? endDate
                  : ""
                : ""
            }
            onChange={(e) => handleInputChange(config.name, e.target.value)}
            className="p-1 border border-gray-300 rounded"
            placeholder={config.placeholder}
          />
        )}
      </div>
    ));
  }, [inputConfigs, selectedInterval, searchTerm, startDate, endDate]);

  return (
    <div className="flex justify-start p-2 rounded-lg mb-5">{filterInputs}</div>
  );
};

export default CustomFilter;
