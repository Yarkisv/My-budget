import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StatisticsPage.css";
import { useTotalBalance } from "../contexts/TotalBalanceContext.jsx";
import backArrow from "../images/backArrow.svg";

export default function StatisticsPage() {
  const [monthsTransactions, setMonthsTransactions] = useState([]);

  const { total } = useTotalBalance();

  const API = import.meta.env.VITE_API;

  const navigate = useNavigate();

  const fetchMonthsTransactions = async () => {
    try {
      const response = await axios.get(`${API}/all-transactions-by-month`);

      const sorted = [...response.data].sort(
        (a, b) => new Date(b.month) - new Date(a.month)
      );

      setMonthsTransactions(sorted);
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

      <p className="backText">STATISTICS</p>

      <div className="buttonsBack">
        <div className="SpMonthWrapper">
          <div className="SpMonthList">
            {monthsTransactions.map((item) => {
              const [year, month] = item.month.split("-");
              const lastDay = new Date(year, month, 0).getDate();
              const balanceNumber = Number(item.balance);

              return (
                <div
                  key={item.month}
                  className={`SpMonth ${
                    balanceNumber < 0 ? "negative" : "positive"
                  }`}
                  onClick={() => navigateToMonthStatisticsPage(item.month)}
                >
                  <span>
                    {`01.${month}.${year} - ${lastDay
                      .toString()
                      .padStart(2, "0")}.${month}.${year}`}
                  </span>
                  <span>{item.total_count} транзакций</span>
                  <span>
                    {(balanceNumber > 0 ? "+" : "") +
                      balanceNumber.toLocaleString("uk-UA")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
