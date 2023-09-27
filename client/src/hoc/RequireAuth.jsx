import {
  Navigate,
  useLocation,
} from "react-router-dom";
import { useToken } from "hooks/useToken";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { token } = useToken();

  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
      />
    );
  }

  return children;
};
