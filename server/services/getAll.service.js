import { pool } from "../dbConnection.js";

export const getAll = async (req, res) => {
  try {
    const [costs] = await pool.execute("select * from spending");
    if (!costs || costs.length === 0) {
      console.error("Costs not found");
      return res.status(404).json({ message: "Costs not found" });
    }

    return res.status(200).json(costs);
  } catch (error) {
    console.error(`Server error: ${error}`);
    return res.status(500).json({ message: `Server error: ${error}` });
  }
};
