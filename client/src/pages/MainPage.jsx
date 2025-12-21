import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  const handleSpendingBtnClick = () => {
    navigate("/spending");
  };

  const handleProfitBtnClien = () => {
    navigate("/profit");
  };

  const handleStatisticsBtnClick = () => {
    navigate("/statistics");
  };

  const handleWishlistBtnClick = () => {
    navigate("/wishlist");
  };

  return (
    <div>
      <button onClick={handleSpendingBtnClick}>Трата</button>
      <button onClick={handleProfitBtnClien}>Прибыль</button>
      <button onClick={handleStatisticsBtnClick}>Статистика</button>
      <button onClick={handleWishlistBtnClick}>Wishlist</button>
    </div>
  );
}
