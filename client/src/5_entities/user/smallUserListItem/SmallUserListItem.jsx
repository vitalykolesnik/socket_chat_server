import s from "./SmallUserListItem.module.scss";
import AVATAR from "6_shared/assets/img/user.png";

export const SmallUserListItem = ({ user, children }) => {
  return (
    <div className={s.user}>
      <img src={user.info.avatar || AVATAR} alt="" />
      <p>{user.info.username || user.email}</p>
      {children}
    </div>
  );
};
