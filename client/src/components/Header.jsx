import { useState, useEffect } from "react";
import { useToken } from "hooks/useToken";
import { useSocket } from "hooks/useSocket";
import s from "components/Header.module.scss";

const Header = () => {
  const { socket } = useSocket();
  const { handleLogout } = useToken();
  const [user, setUser] = useState();

  useEffect(() => {
    if (socket) {
      socket.emit("user/login");

      socket.on("user/login-response", (data) => {
        setUser(data);
        socket.emit("users/update");
      });

      socket.on("user/disconnect", () => {
        socket.emit("users/update");
      });
    }
  }, [socket, setUser]);

  return (
    <div className={s.header}>
      {user ? <h5>{user.email}</h5> : ""}
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          socket.disconnect();
          handleLogout();
        }}
      >
        Logout
      </a>
    </div>
  );
};

export default Header;
