import { useNavigate } from "react-router-dom";
import "./MainPage.css";

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
    <div className="allBack">
      <p className="backText">
        MY <br /> BUDGET
      </p>
      <div className="buttonsBack">
        <div className="allButtons">
          <button className="buttonsMain" onClick={handleSpendingBtnClick}>
            Траты
          </button>
          <button className="buttonsMain" onClick={handleProfitBtnClien}>
            Доход
          </button>
          <button className="buttonsMain" onClick={handleStatisticsBtnClick}>
            Статистика
          </button>
        </div>
      </div>

      <button className="wishButton" onClick={handleWishlistBtnClick}>
        Вишлист
      </button>
    </div>
  );
}
