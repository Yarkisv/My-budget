import { pool } from "../dbConnection.js";

export const getTotalBalance = async (req, res) => {
  const query =
    "select sum(case when type = 'income' then amount else -amount end) as total_balance from transactions;";

  try {
    const [result] = await pool.execute(query);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(`Server error: ${error}`);
    return res.status(500).json({ message: `Server error: ${error}` });
  }
};
