import { useEffect, useState } from "react";
import finhub from "../apis/finhub";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";

export const StockList = () => {
  const [stockData, setStockData] = useState([]);
  const { watchList, handleRemove } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((elm) => {
            return finhub.get("/quote", {
              params: {
                symbol: elm,
              },
            });
          })
        );
        const data = responses.map((arr) => {
          return {
            data: arr.data,
            symbol: arr.config.params.symbol,
          };
        });
        setStockData(data);
        // console.log("here ", watchList);
        localStorage.setItem("watchList", JSON.stringify([...watchList]));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [watchList]);

  const handleRowSelect = (symb) => {
    navigate(`detail/${symb}`); // go from a page to another
  };

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79,89,102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclos</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((data) => {
            return (
              <tr
                className="table-row"
                key={data.symbol}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => handleRowSelect(data.symbol)}
              >
                <th scope="row">{data.symbol}</th>
                <td>{data.data.c}</td>
                <td
                  className={
                    parseFloat(data.data.d) > 0 ? "text-success" : "text-danger"
                  }
                >
                  {data.data.d}
                  {parseFloat(data.data.d) > 0 ? (
                    <BsFillCaretUpFill />
                  ) : (
                    <BsFillCaretDownFill />
                  )}
                </td>
                <td
                  className={
                    parseFloat(data.data.dp) > 0
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {data.data.dp}%
                  {parseFloat(data.data.dp) > 0 ? (
                    <BsFillCaretUpFill />
                  ) : (
                    <BsFillCaretDownFill />
                  )}
                </td>
                <td>{data.data.h}</td>
                <td>{data.data.l}</td>
                <td>{data.data.o}</td>
                <td>
                  {data.data.pc}{" "}
                  <button
                    className="btn btn-danger btn-sm ml-3 d-inline-block delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(data.symbol);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
