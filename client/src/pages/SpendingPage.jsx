import axios from "axios";
import { useState } from "react";
import { useTotalBalance } from "../contexts/TotalBalanceContext.jsx";
import backArrow from "../images/backArrow.svg";
import "./SpendingPage.css";

export default function SpendingPage() {
  const todayDate = new Date().toISOString().split("T")[0];

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [costCategory, setCostCategory] = useState("Категория");
  const [date, setDate] = useState(todayDate);

  const { total } = useTotalBalance();

  const API = import.meta.env.VITE_API;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!costCategory) {
      alert("Введи категорию");
    }

    try {
      const response = await axios.post(`${API}/new`, {
        amount,
        description,
        costCategory,
        date,
      });

      setAmount("");
      setDescription("");
      setCostCategory("Категория");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="allBack">
      <div className="headerWrapper1">
        <button className="backButton">
          <img src={backArrow} alt="Back" /> Back
        </button>
        <div className="totalSummary">
          Итог за все время:{" "}
          <span className="positiveSum">
            {total >= 0 ? "+" : "−"}
            {Math.abs(total).toFixed(2)}
          </span>
        </div>
      </div>
      <p className="backText">EXPENSES</p>
      <div className="buttonsBack">
        <form className="formSpending" onSubmit={handleSubmit}>
          <div className="topRow">
            <div className="inputGroupSp">
              <label>Category</label>
              <select
                value={costCategory}
                onChange={(e) => setCostCategory(e.target.value)}
                required
              >
                <option value="">Category</option>
                <option value="food">Food</option>
                <option value="monthly">Monthly</option>
                <option value="entertainment">Entertainment</option>
                <option value="exception">Exception</option>
              </select>
            </div>

            <div className="inputGroupSp">
              <label>Amount</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="inputGroupSp">
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="bottomColumn">
            <textarea
              className="descriptionInput"
              placeholder="Comment"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
