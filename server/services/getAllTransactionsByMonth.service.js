import { pool } from "../dbConnection.js";

export const getAllTransactionsByMonth = async (req, res) => {
  const query = `
                SELECT
                    DATE_FORMAT(transaction_date, '%Y-%m') AS month,
                    COUNT(*) AS total_count,
                    SUM(
                    CASE 
                        WHEN type = 'income' THEN amount
                        WHEN type = 'expense' THEN -amount
                        END) AS balance
                FROM transactions
                GROUP BY DATE_FORMAT(transaction_date, '%Y-%m')
                ORDER BY month;`;

  try {
    const [result] = await pool.execute(query);

    if (result.length === 0) {
      console.log("No result");
      return res.status(404).json({ message: "Data not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log(`Server error: ${error}`);
    return res.status(500).json({ message: `Server error: ${error}` });
  }
};
