import {
  Navigate,
  useLocation,
} from "react-router-dom";
import { useToken } from "hooks/useToken";

export const AutoLogin = ({ children }) => {
  const location = useLocation();
  const { token } = useToken();

  if (token) {
    return (
      <Navigate
        to={location.state?.from?.pathname || "/"}
      />
    );
  }

  return children;
};
