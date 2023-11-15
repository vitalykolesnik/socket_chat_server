import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { isAuthSelector } from "6_shared/store/authSlice";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = useSelector(isAuthSelector);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login", {
        state: { from: location },
        replace: true,
      });
    }
  }, [isAuth, navigate, location]);

  return children;
};
