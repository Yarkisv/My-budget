import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SpendingPage from "./pages/SpendingPage";
import ProfitPage from "./pages/ProfitPage";
import StatisticsPage from "./pages/StatisticsPage";
import WishlistPage from "./pages/WishlistPage";
import { useModal } from "./contexts/ModalWindowsContext";
import AddItemToWishlist from "./components/AddItemToWishlist";
import MonthStatistics from "./pages/MonthStatistics";

function App() {
  const { isAddItemToWishlistOpen } = useModal();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/spending" element={<SpendingPage />} />
        <Route path="/profit" element={<ProfitPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/month/statistics/:period" element={<MonthStatistics />} />
      </Routes>
      {isAddItemToWishlistOpen && <AddItemToWishlist />}
    </Router>
  );
}

export default App;
