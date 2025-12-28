import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TotalBalanceContext = createContext();

export const TotalBalanceProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const API = import.meta.env.VITE_API;

  const fetchTotal = async () => {
    const res = await axios.get(`${API}/total-balance`);

    console.log(res.data.total_balance);

    setTotal(Number(res.data.total_balance));
  };

  useEffect(() => {
    fetchTotal();
  }, []);

  return (
    <TotalBalanceContext.Provider value={{ total, fetchTotal }}>
      {children}
    </TotalBalanceContext.Provider>
  );
};

export const useTotalBalance = () => useContext(TotalBalanceContext);
