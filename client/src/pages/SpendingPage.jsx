import axios from "axios";
import { useEffect, useState } from "react";

export default function SpendingPage() {
  const [costs, setCosts] = useState([]);

  const API = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchCosts = async () => {
      const response = await axios.get(`${API}/get-all`);

      if (response.status === 200) {
        setCosts(response.data);
      }
    };

    fetchCosts();
  }, []);

  useEffect(() => {
    console.log(costs);
  }, [costs]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <div
          style={{
            height: "800px",
            width: "1000px",
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
              </div>
            ))
          ) : (
            <div>Нет расходов</div>
          )}
        </div>
      </div>
    </div>
  );
}
