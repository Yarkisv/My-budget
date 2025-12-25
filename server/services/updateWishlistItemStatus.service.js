import { pool } from "../dbConnection.js";

export const updateWishlistItemStatus = async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await pool.execute(
      "update wishlist set status = ? where id = ?",
      ["completed", id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.json({ message: "Status updated successfully" });
  } catch (error) {
    console.error(`Server error: ${error}`);
    return res.status(500).json({ message: `Server error: ${error}` });
  }
};
