import s from "./Profile.module.scss";
import { FollowButton } from "3_widgets/user";
import { Back } from "4_features/navigation/BackButton";
import avatar from "6_shared/assets/img/user.png";

export const Profile = ({ user }) => {
  return (
    <>
      <div className={s.profile}>
        <Back />
        <FollowButton id={user.id} />
        <img
          style={{ width: "100px" }}
          src={user.info?.avatar || avatar}
          alt=""
        />
        <h5>{user.info?.username || user.email}</h5>
      </div>
    </>
  );
};
