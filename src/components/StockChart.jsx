import { useState } from "react";
import Chart from "react-apexcharts";

const StockChart = ({ data, symbol }) => {
  const { day, week, year } = data;
  const [dateFormat, setDateFormat] = useState("24h");

  const generateDataFromDateFormat = () => {
    switch (dateFormat) {
      case "24h": {
        return day;
      }
      case "7d": {
        return week;
      }
      case "year": {
        return year;
      }
      default: {
        return day;
      }
    }
  };

  const color =
    generateDataFromDateFormat()[generateDataFromDateFormat().length - 1].y -
      generateDataFromDateFormat()[0].y >
    0
      ? "#26C281"
      : "#ED3419";

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "Stock Data",
      animations: {
        speed: 1300,
      },
    },
    xasis: {
      type: "datetime",
    },
  };
  const series = [
    {
      name: symbol,
      data: generateDataFromDateFormat(),
    },
  ];

  const renderButtonSelect = (val) => {
    const classVal = "btn m-1 ";
    if (val === dateFormat) return classVal + "btn-primary";
    else return classVal + "btn-outline-primary";
  };

  return (
    <div
      style={{ backgroundColor: "rgba(145,158,171)" }}
      className="mt-5 p-4 shadow-sm bg-white"
    >
      <Chart options={options} series={series} type="area" width="100%" />
      <div>
        <button
          className={renderButtonSelect("24h")}
          onClick={() => {
            setDateFormat("24h");
          }}
        >
          24h
        </button>
        <button
          className={renderButtonSelect("7d")}
          onClick={() => {
            setDateFormat("7d");
          }}
        >
          7d
        </button>
        <button
          className={renderButtonSelect("year")}
          onClick={() => {
            setDateFormat("year");
          }}
        >
          1y
        </button>
      </div>
    </div>
  );
};

export default StockChart;
