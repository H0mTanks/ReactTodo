import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [data, setData] = useState([]);
  const [currEmail, setCurrEmail] = useState("");

  return (
    <GlobalContext.Provider
      value={{ isLogin, setIsLogin, data, setData, currEmail, setCurrEmail }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
