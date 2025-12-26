import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function MonthStatistics() {
  const { period } = useParams();
  const [transactions, setMonthsTransactions] = useState([]);

  const API = import.meta.env.VITE_API;

  const fetchMonthStatistics = async () => {
    try {
      const response = await axios.get(`${API}/month-statistics/${period}`);

      setMonthsTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMonthStatistics();
  }, [period]);

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Статистика за период: {period}
      </h1>

      {transactions.length === 0 ? (
        <p style={{ color: "#666", textAlign: "center" }}>
          Нет транзакций за выбранный период
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {transactions.map((transaction) => {
            // Определяем цвет фона в зависимости от категории
            let backgroundColor;
            if (transaction.category === "salary") {
              backgroundColor = "rgba(220, 252, 231, 0.9)"; // светло-зеленый
            } else if (transaction.category === "monthly") {
              backgroundColor = "rgba(6, 78, 59, 0.9)"; // темно-зеленый
            } else if (transaction.category === "entertainment") {
              backgroundColor = "rgba(216, 180, 254, 0.9)"; // фиолетовый
            } else if (transaction.category === "food") {
              backgroundColor = "rgba(254, 215, 170, 0.9)"; // оранжевый
            } else {
              backgroundColor = "rgba(243, 244, 246, 0.9)"; // серый по умолчанию
            }

            // Определяем цвет текста для темного фона
            const textColor =
              transaction.category === "monthly" ? "#ffffff" : "#000000";

            // Форматируем дату
            const date = new Date(transaction.transaction_date);
            const formattedDate = date.toLocaleDateString("ru-RU");

            // Форматируем сумму
            const amountSign = transaction.type === "expense" ? "+" : "-";
            const formattedAmount = `${amountSign}${parseFloat(
              transaction.amount
            ).toFixed(2)}`;
            const amountColor =
              transaction.type === "expense" ? "#dc2626" : "#16a34a";

            return (
              <div
                key={transaction.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 18px",
                  borderRadius: "14px",
                  color: textColor,
                  fontSize: "15px",
                  background: backgroundColor,
                  borderLeft: `4px solid ${amountColor}`,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    <span style={{ fontSize: "13px", opacity: 0.8 }}>
                      {formattedDate}
                    </span>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        background: "rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      {transaction.category}
                    </span>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        background:
                          transaction.type === "income"
                            ? "rgba(34, 197, 94, 0.3)"
                            : "rgba(239, 68, 68, 0.3)",
                        color:
                          transaction.type === "income" ? "#166534" : "#991b1b",
                      }}
                    >
                      {transaction.type === "income" ? "Доход" : "Расход"}
                    </span>
                  </div>
                  <div style={{ fontWeight: "500", fontSize: "16px" }}>
                    {transaction.description}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: amountColor,
                    }}
                  >
                    {formattedAmount}
                  </div>
                  <div
                    style={{ fontSize: "12px", opacity: 0.7, marginTop: "2px" }}
                  >
                    USD
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
