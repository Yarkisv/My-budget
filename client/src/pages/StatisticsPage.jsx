import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StatisticsPage() {
  const [monthsTransactions, setMonthsTransactions] = useState([]);

  const API = import.meta.env.VITE_API;

  const navigate = useNavigate();

  const fetchMonthsTransactions = async () => {
    try {
      const response = await axios.get(`${API}/all-transactions-by-month`);

      setMonthsTransactions(response.data);
    } catch (error) {
      console.log(`Server error: ${error}`);
    }
  };

  useEffect(() => {
    fetchMonthsTransactions();
  }, []);

  const navigateToMonthStatisticsPage = (month) => {
    navigate(`/month/statistics/${month}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {monthsTransactions.map((item) => {
        const [year, month] = item.month.split("-");
        const lastDay = new Date(year, month, 0).getDate();
        const balanceNumber = Number(item.balance);

        return (
          <div
            key={item.month}
            onClick={() => navigateToMonthStatisticsPage(item.month)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 18px",
              borderRadius: "14px",
              color: "#e4ebe6",
              fontSize: "15px",
              background:
                balanceNumber >= 0
                  ? "linear-gradient(90deg, rgba(46,94,72,0.9), rgba(46,94,72,0.6))"
                  : "linear-gradient(90deg, rgba(104,38,38,0.9), rgba(104,38,38,0.6))",
            }}
          >
            <span>
              {`01.${month}.${year} - ${lastDay
                .toString()
                .padStart(2, "0")}.${month}.${year}`}
            </span>
            <span style={{ opacity: 0.85 }}>{item.total_count} транзакций</span>
            <span style={{ fontWeight: 600 }}>
              {(balanceNumber > 0 ? "+" : "") +
                balanceNumber.toLocaleString("uk-UA")}
            </span>
          </div>
        );
      })}
    </div>
  );
}
