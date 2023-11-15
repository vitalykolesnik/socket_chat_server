import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useToken } from "6_shared/hooks/useToken";
import { authenticate } from "6_shared/store/authSlice";

export const AutoLogin = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { jwt } = useToken();

  useEffect(() => {
    const token = localStorage.getItem("chat-token");
    if (token !== "null") dispatch(authenticate());
  }, [dispatch]);

  useEffect(() => {
    if (jwt) {
      localStorage.setItem("chat-token", jwt);
      navigate(location.state?.from?.pathname || "/", { replace: true });
    }
  }, [jwt, navigate, location]);

  return children;
};
