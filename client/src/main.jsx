import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ModalProvider } from "./contexts/ModalWindowsContext.jsx";
import { TotalBalanceProvider } from "./contexts/TotalBalanceContext.jsx";

createRoot(document.getElementById("root")).render(
  <TotalBalanceProvider>
    <ModalProvider>
      <App />
    </ModalProvider>
  </TotalBalanceProvider>
);
