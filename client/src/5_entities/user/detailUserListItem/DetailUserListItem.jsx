import s from "./DetailUserListItem.module.scss";
import AVATAR from "6_shared/assets/img/user.png";

export const DetailUserListItem = ({ user }) => {
  return (
    <div className={s.user}>
      <img src={user.info.avatar || AVATAR} alt="" />
      (user.info.username || user.email)
    </div>
  );
};
