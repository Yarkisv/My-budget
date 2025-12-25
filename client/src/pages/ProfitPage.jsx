import axios from "axios";
import React, { useState } from "react";

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
    <div>
      <form onSubmit={submitIncoming}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Сумма"
          value={amount}
          required
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Внести</button>
      </form>
    </div>
  );
}
