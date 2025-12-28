import { useState } from "react";
import { useModal } from "../contexts/ModalWindowsContext";
import CancelWish from "../images/CancelWish.svg";
import "./AddItemToWishlist.css";
import axios from "axios";

export default function AddItemToWishlist() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  const API = import.meta.env.VITE_API;
  const { isAddItemToWishlistOpen, setAddItemToWishlistOpen } = useModal();

  const handleCloseWindow = () => {
    setAddItemToWishlistOpen(false);
  };

  const handleAddWishlistItem = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/new-wishlist-item`, {
        product_name: productName,
        price,
      });

      if (response.status === 201) {
        setAddItemToWishlistOpen(false);
        setProductName("");
        setPrice("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!isAddItemToWishlistOpen) return null;

  return (
    <div className="wishlistModalOverlay">
      <div className="wishlistModal">
        <button className="wishlistModalClose" onClick={handleCloseWindow}>
          <img className="closeWish" src={CancelWish} alt="Close" />
        </button>

        <h2 className="wishlistModalTitle">Adding</h2>

        <form className="wishlistForm" onSubmit={handleAddWishlistItem}>
          <div className="wishlistField">
            <label>Sum</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="300"
            />
          </div>

          <div className="wishlistField">
            <label>Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Компьютер"
            />
          </div>

          <button type="submit" className="wishlistSubmit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
