import React, { useEffect, useState } from "react";
import CustomLegend from "../component/chart/CustomLegend";
import CustomeFilter from "../component/chart/CustomeFilter";
import CustomChart from "../component/chart/CustomChart";
import CustomTable from "../component/chart/CustomTable";

const initialData = [
  {
    name: "Page A",
    date: "2024-01-01",
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: "Page B",
    date: "2024-01-02",
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: "Page C",
    date: "2024-01-04",
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: "Page D",
    date: "2024-04-04",
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: "Page E",
    date: "2024-05-05",
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: "Page F",
    date: "2024-07-06",
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
  {
    name: "Page A",
    date: "2024-01-01",
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: "Page B",
    date: "2024-01-02",
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: "Page C",
    date: "2024-01-04",
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: "Page D",
    date: "2024-04-04",
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: "Page E",
    date: "2024-05-05",
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: "Page F",
    date: "2024-07-06",
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];

export default function Main() {
  const [data, setData] = useState(initialData);
  const [showAmt, setShowAmt] = useState(true);
  const [showPv, setShowPv] = useState(true);
  const [showUv, setShowUv] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const initialDataKeys = Object.keys(initialData[0]);

  const toggleShow = (dataType) => {
    switch (dataType) {
      case "amt":
        setShowAmt(!showAmt);
        break;
      case "pv":
        setShowPv(!showPv);
        break;
      case "uv":
        setShowUv(!showUv);
        break;
      default:
        break;
    }
  };

  const filterData = () => {
    let newData = data;
    newData = initialData.filter((item) => {
      return item.date >= startDate && item.date <= endDate;
    });

    console.log(searchTerm);
    if (searchTerm.trim() !== "") {
      newData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setData(newData);
  };

  const setInitialDates = (initialStartDate, initialEndDate) => {
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
  };

  useEffect(() => {
    filterData();
  }, [startDate, endDate, searchTerm]);

  return (
    <>
      <CustomeFilter
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        filterData={filterData}
        setInitialDates={setInitialDates}
        setSearchTerm={setSearchTerm}
      />
      {/* 차트 */}
      <CustomChart
        data={data}
        settings={{
          amt: { show: showAmt, color: "#8884d8" },
          pv: { show: showPv, color: "#413ea0" },
          uv: { show: showUv, color: "#ff7300" },
        }}
        chartStyle={chartStyle}
      />
      <CustomLegend
        showAmt={showAmt}
        showPv={showPv}
        showUv={showUv}
        toggleShow={toggleShow}
      />
      {/* 테이블 */}
      <CustomTable
        data={data}
        startDate={startDate}
        endDate={endDate}
        searchTerm={searchTerm}
      />
    </>
  );
}

const chartStyle = {
  fontSize: "12px",
  fill: "#b8b8b8",
  fontWeight: "bold",
};
