import React, { useEffect, useState } from "react";
import CustomLegend from "../component/chart/CustomLegend";
import CustomChart from "../component/chart/CustomChart";
import CustomTable from "../component/chart/CustomTable";
import CustomFilter from "../component/chart/CustomeFilter";

const initialData = [
  {
    name: "Page A",
    date: "2024-01-01",
    신원인식등록: 590,
    맥파검사: 800,
    심리검사: 1400,
    신체검사: 100,
  },
  {
    name: "Page B",
    date: "2024-01-02",
    신원인식등록: 868,
    맥파검사: 967,
    심리검사: 1506,
    신체검사: 100,
  },
  {
    name: "Page C",
    date: "2024-01-04",
    신원인식등록: 1397,
    맥파검사: 1098,
    심리검사: 989,
    신체검사: 100,
  },
  {
    name: "Page D",
    date: "2024-04-04",
    신원인식등록: 1480,
    맥파검사: 1200,
    심리검사: 1228,
    신체검사: 200,
  },
  {
    name: "Page E",
    date: "2024-05-05",
    신원인식등록: 1520,
    맥파검사: 1108,
    심리검사: 1100,
    신체검사: 100,
  },
  {
    name: "Page F",
    date: "2024-07-06",
    신원인식등록: 1400,
    맥파검사: 680,
    심리검사: 1700,
    신체검사: 200,
  },
  {
    name: "Page A",
    date: "2024-01-01",
    신원인식등록: 590,
    맥파검사: 800,
    심리검사: 1400,
    신체검사: 200,
  },
  {
    name: "Page B",
    date: "2024-01-02",
    신원인식등록: 868,
    맥파검사: 967,
    심리검사: 1506,
    신체검사: 300,
  },
  {
    name: "Page C",
    date: "2024-01-04",
    신원인식등록: 1397,
    맥파검사: 1098,
    심리검사: 989,
    신체검사: 300,
  },
  {
    name: "Page D",
    date: "2024-04-04",
    신원인식등록: 1480,
    맥파검사: 1200,
    심리검사: 1228,
    신체검사: 300,
  },
  {
    name: "Page E",
    date: "2024-05-05",
    신원인식등록: 1520,
    맥파검사: 1108,
    심리검사: 1100,
    신체검사: 300,
  },
  {
    name: "Page F",
    date: "2024-07-06",
    신원인식등록: 1400,
    맥파검사: 680,
    심리검사: 1700,
    신체검사: 300,
  },
];

export default function Main() {
  const [data, setData] = useState(initialData);
  const [show심리검사, setShow심리검사] = useState(true);
  const [show맥파검사, setShow맥파검사] = useState(true);
  const [show신원인식등록, setShow신원인식등록] = useState(true);
  const [show신체검사, setShow신체검사] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");

  const toggleShow = (dataType) => {
    switch (dataType) {
      case "심리검사":
        setShow심리검사(!show심리검사);
        break;
      case "맥파검사":
        setShow맥파검사(!show맥파검사);
        break;
      case "신원인식등록":
        setShow신원인식등록(!show신원인식등록);
        break;
      case "신체검사":
        setShow신체검사(!show신체검사);
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
      console.log(searchTerm);
      newData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (searchTerm2.trim() !== "") {
      console.log(searchTerm2);
      newData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm2.toLowerCase())
      );
    }
    setData(newData);
  };

  useEffect(() => {
    filterData();
  }, [startDate, endDate, searchTerm, searchTerm2]);

  const legendItems = [
    {
      label: "심리검사",
      color: "#8884d8",
      isChecked: show심리검사,
      onClick: () => toggleShow("심리검사"),
    },
    {
      label: "맥파검사",
      color: "#413ea0",
      isChecked: show맥파검사,
      onClick: () => toggleShow("맥파검사"),
    },
    {
      label: "신원인식등록",
      color: "#ff7300",
      isChecked: show신원인식등록,
      onClick: () => toggleShow("신원인식등록"),
    },
    {
      label: "신체검사",
      color: "#000",
      isChecked: show신체검사,
      onClick: () => toggleShow("신체검사"),
    },
  ];

  return (
    <>
      {/* <CustomeFilter
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        filterData={filterData}
        setInitialDates={setInitialDates}
        setSearchTerm={setSearchTerm}
      /> */}
      <CustomFilter
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        filterData={filterData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchTerm2={searchTerm2}
        setSearchTerm2={setSearchTerm2}
        inputConfigs={[
          {
            type: "text",
            label: "Search by name",
            name: "searchTerm",
            placeholder: "총판 검색",
          },
          {
            type: "text",
            label: "Search by name",
            name: "searchTerm2",
            placeholder: "이름 검색",
          },
          { type: "date", label: "Start Date", name: "startDate" },
          { type: "date", label: "End Date", name: "endDate" },
          {
            type: "select",
            label: "Select Option",
            name: "selectOption",
            options: [
              { value: "", label: "select" },
              { value: "oneday", label: "oneday" },
              { value: "onemonth", label: "onemonth" },
              { value: "oneyear", label: "oneyear" },
            ],
          },
        ]}
      />
      {/* 차트 */}
      <CustomChart
        data={data}
        settings={{
          심리검사: { show: show심리검사, color: "#8884d8" },
          맥파검사: { show: show맥파검사, color: "#413ea0" },
          신원인식등록: { show: show신원인식등록, color: "#ff7300" },
          신체검사: { show: show신체검사, color: "#000" },
        }}
        chartStyle={chartStyle}
      />
      <CustomLegend legendItems={legendItems} />;{/* 테이블 */}
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
  fontSize: "text-xs",
  fill: "text-gray-700",
  fontWeight: "font-semibold",
};
