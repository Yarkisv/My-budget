import { pool } from "../dbConnection.js";

export const newIncoming = async (req, res) => {
  try {
    const { amount, date } = req.body;

    const query =
      "insert into transactions (type, category, transaction_date, description, amount) value (?,?,?,?,?)";

    const [result] = await pool.execute(query, [
      "income",
      "salary",
      date,
      "salary",
      amount,
    ]);

    return res.status(200).json({
      message: "Success",
      data: {
        id: result.insertId,
        type: "expense",
        category: "salary",
        transaction_date: date,
        description: "salary",
        amount,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: `Server error: ${error}` });
  }
};
