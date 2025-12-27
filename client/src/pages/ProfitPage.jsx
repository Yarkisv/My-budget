import axios from "axios";
import React, { useState } from "react";
import "./ProfitPage.css";
import backArrow from "../images/backArrow.svg";

export default function ProfitPage() {
  const todayDate = new Date().toISOString().split("T")[0];

  const API = import.meta.env.VITE_API;

  const [date, setDate] = useState(todayDate);
  const [amount, setAmount] = useState("");

  const submitIncoming = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/new-incoming`, {
        date,
        amount,
      });

      setAmount("");
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
          Итог за все время: <span className="positiveSum">+33332</span>
        </div>
      </div>

      <p className="backText">PROFIT</p>
      <div className="buttonsBack">
        <form className="formProfit" onSubmit={submitIncoming}>
          <div className="inputGroup">
            <label htmlFor="dateInput">Date</label>
            <input
              id="dateInput"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="amountInput">Amount</label>
            <input
              id="amountInput"
              type="text"
              placeholder="Amount"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
