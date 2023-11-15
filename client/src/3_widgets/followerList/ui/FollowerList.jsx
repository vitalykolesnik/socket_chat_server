import s from "./FollowerList.module.scss";
import { OpenUser } from "4_features/navigation/openUser/OpenUser";
import { SmallUserListItem } from "5_entities/user/smallUserListItem/SmallUserListItem";
import { List } from "6_shared/ui/List";
import { useSelector } from "react-redux";
import { friendsSelector } from "6_shared/store/authSlice";
import AVATAR from "6_shared/assets/img/user.png";

export const FollowerList = () => {
  const followers = useSelector(friendsSelector);

  return (
    <div className={s.followerList}>
      <List
        items={followers}
        resourceName="user"
        itemComponent={FollowerItemWidget}
      />
    </div>
  );
};

const FollowerItemWidget = ({ user }) => {
  return (
    <OpenUser user={user}>
      <div className={s.followerItem}>
        <img src={user.info?.avatar || AVATAR} alt="" />
        <p>{user.info?.username || user.email}</p>
      </div>
    </OpenUser>
  );
};
