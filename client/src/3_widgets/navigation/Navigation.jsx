import s from "./Navigation.module.scss";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  const isActive = ({ isActive }) => (isActive ? s.isActive : "");

  return (
    <div className={s.container}>
      <NavLink className={isActive} to="/">
        Home
      </NavLink>
      <NavLink className={isActive} to="/user">
        Users
      </NavLink>
    </div>
  );
};
