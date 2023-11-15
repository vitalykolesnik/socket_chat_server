import { useContext } from "react";
import { SocketContext } from "6_shared/context/SocketContext";

export const useSocket = () => {
  return useContext(SocketContext);
};
