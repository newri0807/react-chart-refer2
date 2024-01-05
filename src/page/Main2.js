import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "A", uv: 400, pv: 2400, amt: 2400 },
  { name: "B", uv: 300, pv: 4567, amt: 2400 },
  { name: "C", uv: 300, pv: 1398, amt: 2400 },
  { name: "D", uv: 200, pv: 9800, amt: 2400 },
  { name: "E", uv: 278, pv: 3908, amt: 2400 },
  { name: "F", uv: 189, pv: 4800, amt: 2400 },
];

const SimpleBarChart = () => {
  return (
    <BarChart width={400} height={300} data={data} layout="vertical">
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
  );
};

export default SimpleBarChart;
