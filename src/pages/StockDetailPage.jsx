import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finhub from "../apis/finhub";
import StockChart from "../components/StockChart";

const usefullFunction = (string, format) => {
  switch (format) {
    case "24h":
      return string.match(/(\d{2} \d{4} \d{2}:\d{2})/)[0];
    case "7d":
      return string.match(/(\w{3} \w{3} \d{2})/)[0];
    case "1y":
      return string.match(/(\w{3} \w{3} \d{2})/)[0];
  }
};

const formatData = (data, format) => {
  return data.t.map((el, index) => {
    const dateString = new Date(el * 1000).toString();
    return {
      x: usefullFunction(dateString, format),
      y: data.c[index],
    };
  });
};

export const StockDetailPage = () => {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000); // get the current time in unix epoch format
      const OneWeek = currentTime - 7 * 24 * 60 * 60;
      const OneYear = currentTime - 365 * 24 * 60 * 60;
      let OneDay;

      // if saturday then we get the historic of (friday-thursday)
      if (date.getDay() === 6) OneDay = currentTime - 2 * 24 * 60 * 60;
      // if sunday then we get the historic of (friday-thursday)
      if (date.getDay() === 0) OneDay = currentTime - 3 * 24 * 60 * 60;
      // else we get the data of one day earlier
      else OneDay = currentTime - 24 * 60 * 60;
      try {
        const responses = await Promise.all([
          finhub.get("/stock/candle", {
            params: {
              symbol: symbol,
              from: OneDay,
              to: currentTime,
              resolution: "30",
            },
          }),
          finhub.get("/stock/candle", {
            params: {
              symbol: symbol,
              from: OneWeek,
              to: currentTime,
              resolution: "D",
            },
          }),
          finhub.get("/stock/candle", {
            params: {
              symbol: symbol,
              from: OneYear,
              to: currentTime,
              resolution: "W",
            },
          }),
        ]);
        setChartData({
          day: formatData(responses[0].data, "24h"),
          week: formatData(responses[1].data, "7d"),
          year: formatData(responses[2].data, "1y"),
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  if (chartData === null) return <div>Loading...</div>;
  return (
    <div>
      <StockChart data={chartData} symbol={symbol} />
    </div>
  );
};
