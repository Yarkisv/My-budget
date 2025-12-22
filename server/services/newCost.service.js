import { pool } from "../dbConnection.js";

export const newCost = async (req, res) => {
  try {
    const { amount, description, costCategory } = req.body;

    const todayDate = new Date();

    const formattedDate = todayDate.toISOString().split("T")[0];

    console.log(amount, description, costCategory, formattedDate);

    const query =
      "insert into spending (category, spent_date, description_, amount) value (?,?,?,?)";

    const [result] = await pool.execute(query, [
      costCategory,
      formattedDate,
      description,
      amount,
    ]);

    return res.status(200).json({
      message: "Success",
      data: {
        id: result.insertId,
        category: costCategory,
        spent_date: formattedDate,
        description_: description,
        amount,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: `Server error: ${error}` });
  }
};
