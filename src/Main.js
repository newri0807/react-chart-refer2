import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import styled from "styled-components";
import CustomLegend from "./component/chart/CustomLegend";
import CustomeFilter from "./component/chart/CustomeFilter";

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
    date: "2024-01-03",
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

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={700}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis
              dataKey="date"
              style={chartStyle}
              interval={
                data?.length >= 30 ? parseInt(`${data.length / 30}`) : 0
              }
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              style={chartStyle}
              interval={0}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            {showAmt && (
              <Bar dataKey="amt" barSize={20} fill="#8884d8" name="Amt" />
            )}
            {showPv && (
              <Bar dataKey="pv" barSize={20} fill="#413ea0" name="Pv" />
            )}
            {showUv && (
              <Bar dataKey="uv" barSize={20} fill="#ff7300" name="Uv" />
            )}
          </ComposedChart>
        </ResponsiveContainer>

        <CustomLegend
          showAmt={showAmt}
          showPv={showPv}
          showUv={showUv}
          toggleShow={toggleShow}
        />
      </div>
    </>
  );
}

const chartStyle = {
  fontSize: "12px",
  fill: "#b8b8b8",
  fontWeight: "bold",
};
