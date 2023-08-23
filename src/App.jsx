import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StockDetailPage } from "./pages/StockDetailPage";
import { StockOverviewPage } from "./pages/StockOverviewPage";
import { NotFound } from "./pages/NotFound";
function App() {
  return (
    <main className="container">
      <Router>
        <Routes>
          <Route path="/" element={<StockOverviewPage />}></Route>
          <Route path="/detail/:symbol" element={<StockDetailPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
