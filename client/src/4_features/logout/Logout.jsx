import { useNavigate } from "react-router-dom";
import { useToken } from "6_shared/hooks/useToken";
import { Button } from "6_shared/ui/Button";

export const Logout = () => {
  // const { socket } = useSocket();
  const navigate = useNavigate();
  const { handleLogout } = useToken();

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

  const handleClick = () => {
    handleLogout();
    navigate("/", { replace: true });
  };

  return <Button action={handleClick}>Logout</Button>;
};
