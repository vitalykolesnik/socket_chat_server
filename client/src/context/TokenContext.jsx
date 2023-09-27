import { createContext } from "react";
import axios from "axios";
import { useLocalStorage } from "hooks/useLocalStorage";
import { BASE_URL } from "config";

export const TokenContext = createContext("null");

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage(
    "token",
    null
  );

  const handleLogin = async (payload) => {
    const { data } = await axios.post(
      BASE_URL + "/signin",
      payload
    );
    setToken(data.user?.token);
  };

  const handleSignup = async (payload) => {
    const { data } = await axios.post(
      BASE_URL + "/signup",
      payload
    );
    setToken(data.user?.token);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    handleLogin,
    handleLogout,
    handleSignup,
  };

  return (
    <TokenContext.Provider value={value}>
      {children}
    </TokenContext.Provider>
  );
};
