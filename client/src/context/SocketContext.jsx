import {
  useEffect,
  useState,
  createContext,
} from "react";
import { io } from "socket.io-client";

import { useToken } from "hooks/useToken";
import { BASE_URL } from "config";

export const SocketContext =
  createContext("null");

const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : BASE_URL;

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { token } = useToken();

  useEffect(() => {
    const currentSocket = io(URL, {
      autoConnect: true,
      auth: { token },
    });
    setSocket(currentSocket);
    console.log("useSocket");
  }, [token]);

  const value = {
    socket,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
