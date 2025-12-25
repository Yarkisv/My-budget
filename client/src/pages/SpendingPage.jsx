import axios from "axios";
import { useEffect, useState } from "react";

export default function SpendingPage() {
  const todayDate = new Date().toISOString().split("T")[0];

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [costCategory, setCostCategory] = useState("Категория");
  const [date, setDate] = useState(todayDate);

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
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <select
            value={costCategory}
            onChange={(e) => setCostCategory(e.target.value)}
          >
            <option value="">Категория</option>
            <option value="food">Еда</option>
            <option value="monthly">Месячные затраты</option>
            <option value="entertainment">Развлечения</option>
            <option value="exception">Исключение</option>
          </select>

          <input
            type="text"
            placeholder="Сумма"
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit">Внести</button>
        </form>
      </div>
    </div>
  );
}
