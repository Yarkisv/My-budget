import { pool } from "../dbConnection.js";

export const removeWishlistItem = async (req, res) => {
  const id = req.params.id;

  try {
    await pool.execute("delete from wishlist where id = ?", [id]);

    return res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.log(`Server error: ${error}`);
    return res.status(500).json({ message: `Server error: ${error}` });
  }
};
