import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem("watchList")) || []
  );
  const rowHandle = (symb) => {
    if (
      watchList.filter((elm) => {
        if (elm === symb) return elm;
      }).length > 0
    )
      alert(`${symb} Already in Your Watch List`);
    else setWatchList([...watchList, symb]);
  };

  const handleRemove = (symb) => {
    const neuWatchList = watchList.filter((elm) => {
      if (elm !== symb) return elm;
    });
    localStorage.setItem("watchList", JSON.stringify(neuWatchList));
    setWatchList(neuWatchList);
  };
  return (
    <AppContext.Provider value={{ watchList, rowHandle, handleRemove }}>
      {children}
    </AppContext.Provider>
  );
};
const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
