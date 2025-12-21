import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SpendingPage from "./pages/SpendingPage";
import ProfitPage from "./pages/ProfitPage";
import StatisticsPage from "./pages/StatisticsPage";
import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/spending" element={<SpendingPage />} />
        <Route path="/profit" element={<ProfitPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </Router>
  );
}

export default App;
