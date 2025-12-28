import { useState } from "react";
import { useModal } from "../contexts/ModalWindowsContext";
import axios from "axios";

export default function AddItemToWishlist() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  const API = import.meta.env.VITE_API;

  const { isAddItemToWishlistOpen, setAddItemToWishlistOpen } = useModal();

  const handleCloseWindow = () => {
    setAddItemToWishlistOpen(!isAddItemToWishlistOpen);
  };

  const handleAddWishlistItem = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/new-wishlist-item`, {
        product_name: productName,
        price,
      });

      if (response.status === 201) {
        setAddItemToWishlistOpen(!isAddItemToWishlistOpen);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#1e1e2f",
          padding: "30px",
          borderRadius: "12px",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          color: "#fff",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <button
          onClick={handleCloseWindow}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <h2 style={{ textAlign: "center", margin: 0 }}>Добавление</h2>

        <form onSubmit={handleAddWishlistItem}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label>Сумма</label>
            <input
              type="text"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #555",
                backgroundColor: "#2a2a3f",
                color: "#fff",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label>Название</label>
            <input
              type="text"
              placeholder="Название товара"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #555",
                backgroundColor: "#2a2a3f",
                color: "#fff",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#8b7c5d",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            внести
          </button>
        </form>
      </div>
    </div>
  );
}
