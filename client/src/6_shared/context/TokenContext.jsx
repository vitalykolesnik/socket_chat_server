import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  registerUser,
  logoutUser,
  tokenSelector,
} from "6_shared/store/authSlice";

export const TokenContext = createContext("null");

export const TokenProvider = ({ children }) => {
  const jwt = useSelector(tokenSelector);

  const dispatch = useDispatch();
  const handleLogin = async (payload) => {
    dispatch(loginUser(payload));
  };

  const handleSignup = async (payload) => {
    dispatch(registerUser(payload));
  };

  const handleLogout = () => {
    localStorage.setItem("chat-token", null);
    dispatch(logoutUser());
  };

  const value = {
    jwt,
    handleLogin,
    handleLogout,
    handleSignup,
  };

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};
