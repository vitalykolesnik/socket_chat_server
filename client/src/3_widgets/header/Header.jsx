import s from "./Header.module.scss";
import { useSelector } from "react-redux";
import { OpenUser } from "4_features/navigation/openUser/OpenUser";
import { Logout } from "4_features/logout/Logout";
import { profileSelector } from "6_shared/store/authSlice";
import { Icon } from "6_shared/ui/Icon";

// import { useSocket } from "shared/hooks/useSocket";

export const Header = () => {
  // const { socket } = useSocket();

  // useEffect(() => {
  //   if (socket) {
  //     socket.emit("user/login");

  //     socket.on("user/login-response", (data) => {
  //       setUser(data);
  //       socket.emit("users/update");
  //     });

  //     socket.on("user/disconnect", () => {
  //       socket.emit("users/update");
  //     });
  //   }
  // }, [socket, setUser]);

  const user = useSelector(profileSelector);
  return (
    <div className={s.header}>
      {user && (
        <OpenUser user={user}>
          <div className={s.profile}>
            <Icon
              src={user.info?.avatar}
              title={user.info?.username || user.email}
            />
            <p>{user.email}</p>
          </div>
        </OpenUser>
      )}
      <Logout />
    </div>
  );
};
