import { pool } from "../dbConnection.js";

export const newWishlistItem = async (req, res) => {
  const { product_name, price } = req.body;

  const query = "insert into wishlist (product_name, price) values (?,?)";

  try {
    const [result] = await pool.execute(query, [product_name, price]);

    return res.status(201).json({ message: "Success" });
  } catch (error) {
    console.log(`Server error: ${error}`);
    return res.status(500).json({ message: `Server error: ${error}` });
  }
};
