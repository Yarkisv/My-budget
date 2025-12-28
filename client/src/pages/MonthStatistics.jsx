import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./MonthStatistics.css";
import backArrow from "../images/backArrow.svg";
import { useTotalBalance } from "../contexts/TotalBalanceContext.jsx";

export default function MonthStatistics() {
  const { period } = useParams();
  const [transactions, setTransactions] = useState([]);

  const { total } = useTotalBalance();

  const API = import.meta.env.VITE_API;

  const fetchMonthStatistics = async () => {
    try {
      const response = await axios.get(`${API}/month-statistics/${period}`);

      console.log(response.data);

      const sorted = [...response.data].sort(
        (a, b) => new Date(b.transaction_date) - new Date(a.transaction_date)
      );

      console.log(sorted);

      setTransactions(sorted);
    } catch (error) {
      console.log(error);
    }
  };

  const totalMyMonth = useMemo(() => {
    return transactions.reduce((sum, t) => {
      const amount = Number(t.amount);

      return t.type === "income" ? sum + amount : sum - amount;
    }, 0);
  }, [transactions]);

  useEffect(() => {
    fetchMonthStatistics();
  }, [period]);

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
        <div className="periodBlock">
          период:
          <span className="periodBadge">01.12.2025 - 01.01.2026</span>
        </div>
        <div className="transactionsListWrapper">
          <div className="transactionsList">
            {transactions.map((transaction) => {
              const date = new Date(
                transaction.transaction_date
              ).toLocaleDateString("ru-RU");

              return (
                <div
                  key={transaction.id}
                  className={`transactionItem ${transaction.category}`}
                >
                  <div className="transactionLeft">
                    <span className="transactionDate">{date}</span>
                    <span className="transactionDesc">
                      {transaction.description}
                    </span>
                  </div>

                  <div className="transactionRight">
                    <span className="transactionCategory">
                      {transaction.category}
                    </span>
                    <span className="transactionAmount">
                      {transaction.type === "income" ? "+" : "-"}
                      {transaction.amount}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="monthTotal">
          Итог за месяц:{" "}
          <span className={total >= 0 ? "positive" : "negative"}>
            {totalMyMonth >= 0 ? "+" : "−"}
            {Math.abs(totalMyMonth).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
