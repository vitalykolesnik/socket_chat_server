import s from "./FollowButton.module.scss";
import { useSelector } from "react-redux";
import { FollowUser } from "4_features/user/followUser/FollowUser";
import { profileSelector } from "6_shared/store/authSlice";

export const FollowButton = ({ id, isFollow = "-", isNotFollow = "+" }) => {
  const profile = useSelector(profileSelector);

  const followStatus = profile.friends?.some((f) => f.id === id);
  return (
    <div className={s.followUserButton}>
      <FollowUser id={id}>{followStatus ? isFollow : isNotFollow}</FollowUser>
    </div>
  );
};
