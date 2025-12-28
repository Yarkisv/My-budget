import axios from "axios";
import { useState, useEffect } from "react";
import { useModal } from "../contexts/ModalWindowsContext";
import { useTotalBalance } from "../contexts/TotalBalanceContext.jsx";
import { useNavigate } from "react-router-dom";
import backArrow from "../images/backArrow.svg";
import AcceptWish from "../images/AcceptWish.svg";
import CancelWish from "../images/CancelWish.svg";
import "./WishlistPage.css";

export default function WishlistPage() {
  const API = import.meta.env.VITE_API;
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState([]);
  const { isAddItemToWishlistOpen, setAddItemToWishlistOpen } = useModal();
  const { total } = useTotalBalance();

  const fetchWishlistItems = async () => {
    try {
      const response = await axios.get(`${API}/get-wishlist-items`);
      setWishlistItems(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromWishlist = async (id) => {
    try {
      await axios.delete(`${API}/remove-wishlist-item/${id}`);
      fetchWishlistItems();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatusClick = async (id) => {
    try {
      await axios.put(`${API}/update-wishlist-item-status/${id}`);
      fetchWishlistItems();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  return (
    <div className="allBack">
      <div className="headerWrapper">
        <button className="backButton" onClick={() => navigate(-1)}>
          <img src={backArrow} alt="Back" /> Назад
        </button>

        <div className="totalSummary">
          итог за все время:{" "}
          <span className="positiveSum">
            {total >= 0 ? "+" : "−"}
            {Math.abs(total)}
          </span>
        </div>
      </div>

      <p className="backText">WISHLIST</p>

      <div className="buttonsBack">
        <div className="wishlistWrapper">
          <div className="wishlistList">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className={`wishlistItem ${
                  item.status === "completed" ? "completed" : ""
                }`}
              >
                <span className="wishlistText">
                  {item.product_name} {item.price}
                </span>

                {item.status === "completed" ? (
                  <span className="wishlistStatus">Выполнено</span>
                ) : (
                  <div className="wishlistActions">
                    <button onClick={() => handleRemoveFromWishlist(item.id)}>
                      <img className="WishImage" src={CancelWish} alt="Back" />
                    </button>
                    <button onClick={() => handleUpdateStatusClick(item.id)}>
                      <img className="WishImage" src={AcceptWish} alt="Back" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="wishlistDivider" />

          <button
            className="addWishlistButton"
            onClick={() => setAddItemToWishlistOpen(!isAddItemToWishlistOpen)}
          >
            + добавить
          </button>
        </div>
      </div>
    </div>
  );
}
