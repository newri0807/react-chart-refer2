import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CustomChart = ({ data, settings, chartStyle }) => {
  console.log(settings);
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart
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
            interval={data?.length >= 30 ? parseInt(`${data.length / 30}`) : 0}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            style={chartStyle}
            interval={0}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          {Object.keys(settings).map((dataType) =>
            settings[dataType].show ? (
              <Bar
                key={dataType}
                dataKey={dataType}
                barSize={20}
                fill={settings[dataType].color}
                name={dataType.toUpperCase()}
              />
            ) : null
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomChart;
