import { useEffect, useState } from "react";
import finhub from "../apis/finhub";
import { useGlobalContext } from "../context";

export const AutoComplete = () => {
  const [currentSearch, setcurrentSearch] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);
  const { rowHandle } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await finhub.get("/search", {
          params: {
            q: currentSearch,
          },
        });
        let data = resp.data.result;
        setAutoComplete(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentSearch.length > 0) fetchData();
    else setAutoComplete([]);
  }, [currentSearch]);

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          type="text"
          style={{ background: "rgba(145, 158, 171, 0.04)" }}
          id="search"
          placeholder="Search"
          className="form-control"
          autoComplete="off"
          value={currentSearch}
          onChange={(e) => setcurrentSearch(e.target.value)}
        />
        <label htmlFor="search">Search</label>
        <ul
          style={{
            height: "200px",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
          className={
            autoComplete.length > 0 ? "dropdown-menu show" : "dropdown-menu"
          }
        >
          {autoComplete.map((elm) => {
            return (
              <li
                key={elm.symbol}
                onClick={() => {
                  setAutoComplete([]);
                  rowHandle(elm.symbol);
                }}
              >
                {elm.description} ({elm.symbol})
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
