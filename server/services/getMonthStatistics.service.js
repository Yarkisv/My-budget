import { pool } from "../dbConnection.js";

export const getMonthStatistics = async (req, res) => {
  try {
    const { period } = req.params;

    const [year, month] = period.split("-");

    const currentMonth = Number(month);

    let nextMonthNumber;
    let nextYear = year;

    if (currentMonth === 12) {
      nextMonthNumber = 1;
      nextYear = Number(year) + 1;
    } else {
      nextMonthNumber = Number(month) + 1;
    }

    console.log(`${year}-${month}-01`, `${nextYear}-${nextMonthNumber}-01`);

    const query =
      "select * from transactions where transaction_date >= ? and transaction_date < ? order by transaction_date";

    const [rows] = await pool.execute(query, [
      `${year}-${month}-01`,
      `${nextYear}-${nextMonthNumber}-01`,
    ]);

    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
