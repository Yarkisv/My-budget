import axios from "axios";
import { useEffect, useState } from "react";

export default function SpendingPage() {
  const todayDate = new Date().toISOString().split("T")[0];

  // const [costs, setCosts] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [costCategory, setCostCategory] = useState("Категория");
  const [date, setDate] = useState(todayDate);

  const API = import.meta.env.VITE_API;

  // useEffect(() => {
  //   const fetchCosts = async () => {
  //     const response = await axios.get(`${API}/get-all`);

  //     if (response.status === 200) {
  //       setCosts(response.data);
  //     }
  //   };

  //   fetchCosts();
  // }, []);

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

      // setCosts((prev) => [...prev, response.data.data]);

      setAmount("");
      setDescription("");
      setCostCategory("Категория");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
    // style={{
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   height: "100vh",
    // }}
    >
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

      {/* <div>
        <div
          style={{
            // height: "800px",
            // width: "1000px",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            backgroundColor: "#fff",
          }}
        >
          {costs.length > 0 ? (
            costs.map((cost) => (
              <div
                key={cost.id}
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  marginBottom: "8px",
                  borderRadius: "6px",
                }}
              >
                <h2>{cost.amount}</h2>
                <h3>{cost.category}</h3>
                <h4>{cost.description_}</h4>
              </div>
            ))
          ) : (
            <div>Нет расходов</div>
          )}
        </div>
      </div> */}
    </div>
  );
}
