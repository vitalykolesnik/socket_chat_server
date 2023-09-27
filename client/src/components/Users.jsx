import { useEffect, useState } from "react";
import { useSocket } from "hooks/useSocket";
import s from "components/Users.module.scss";

const Users = ({ to, setTo }) => {
  const { socket } = useSocket();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.emit("users/getAll");
      socket.on(
        "users/update-response",
        setUsers
      );
    }
  }, [socket]);

  const usersList = users.map((u) => {
    const isSelect =
      to?.id === u.id ? s.selected : "";
    const isOnline = u.socketId ? s.online : "";
    return (
      <div
        className={s.user + " " + isSelect}
        key={u.id}
      >
        <a
          href={u.id}
          onClick={(e) => {
            e.preventDefault();
            setTo(u);
          }}
        >
          <p className={isOnline}>{u.email}</p>
        </a>
      </div>
    );
  });

  return (
    <div className={s.usersList}>{usersList}</div>
  );
};

export default Users;
