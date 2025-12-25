import { pool } from "../dbConnection.js";

export const getWishlistItems = async (req, res) => {
  try {
    const [result] = await pool.execute("select * from wishlist");

    if (result.length === 0) {
      console.log("Wishlist empty");
      return res.status(404).json({ message: "Wishlist empty" });
    }

    return res.status(200).json({ items: result });
  } catch (error) {
    console.log(`Server error: ${error}`);
    return res.status(500).json({ message: `Server error: ${error}` });
  }
};
