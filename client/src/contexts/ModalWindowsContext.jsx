import { createContext, useContext, useState } from "react";

const ModalWindowsContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isAddItemToWishlistOpen, setAddItemToWishlistOpen] = useState(false);

  return (
    <ModalWindowsContext.Provider
      value={{ isAddItemToWishlistOpen, setAddItemToWishlistOpen }}
    >
      {children}
    </ModalWindowsContext.Provider>
  );
};

export const useModal = () => useContext(ModalWindowsContext);
