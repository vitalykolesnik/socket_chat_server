import { useContext } from "react";
import { TokenContext } from "6_shared/context/TokenContext";

export const useToken = () => {
  return useContext(TokenContext);
};
