import React from "react";

const CustomLegend = ({ legendItems }) => {
  console.log(legendItems);
  return (
    <div className="flex justify-center p-2 rounded-lg mb-5">
      {legendItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center mr-5 font-bold cursor-pointer"
          onClick={item.onClick}
        >
          <div
            className={`w-5 h-5 mr-2 border-2 rounded-full`}
            style={{
              borderColor: item.isChecked ? "transparent" : item.color,
              backgroundColor: item.isChecked ? item.color : "transparent",
            }}
          ></div>
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
