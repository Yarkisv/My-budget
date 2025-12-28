import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useModal } from "../contexts/ModalWindowsContext";

export default function WishlistPage() {
  const API = import.meta.env.VITE_API;

  const [wishlistItems, setWishlistItems] = useState([]);

  const { isAddItemToWishlistOpen, setAddItemToWishlistOpen } = useModal();

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
      const response = await axios.delete(`${API}/remove-wishlist-item/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatusClick = async (id) => {
    try {
      const response = await axios.put(
        `${API}/update-wishlist-item-status/${id}`
      );

      fetchWishlistItems();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddItemClick = async () => {
    setAddItemToWishlistOpen(!isAddItemToWishlistOpen);
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  return (
    <div
      style={{
        // display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          height: "800px",
          width: "1000px",
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          backgroundColor: "#fff",
        }}
      >
        {wishlistItems.length > 0 ? (
          <div>
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid black",
                  padding: "10px",
                  marginBottom: "8px",
                  borderRadius: "6px",
                  gap: "5px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <h2>{`${item.product_name} - ${item.price}`}</h2>
                </div>
                <div>
                  {item.status === "completed" ? (
                    <h2>{item.status}</h2>
                  ) : (
                    <div>
                      <button onClick={() => handleRemoveFromWishlist(item.id)}>
                        X
                      </button>
                      <button onClick={() => handleUpdateStatusClick(item.id)}>
                        3
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Wishlist empty</div>
        )}
      </div>
      <button onClick={handleAddItemClick}>+ Добавить</button>
    </div>
  );
}
