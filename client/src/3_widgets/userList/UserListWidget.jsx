import s from "./UserListWidget.module.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FollowButton } from "3_widgets/user";
import { OpenUser } from "4_features/navigation/openUser/OpenUser";
import { SmallUserListItem } from "5_entities/user/smallUserListItem/SmallUserListItem";
import {
  fetchUsers,
  usersSelector,
  userErrorSelector,
  userStatusSelector,
} from "6_shared/store/userSlice";
import { List } from "6_shared/ui/List";

export const UserListWidget = () => {
  const dispatch = useDispatch();
  const users = useSelector(usersSelector);
  const status = useSelector(userStatusSelector);
  const error = useSelector(userErrorSelector);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (error) return `Error: ${error.message}`;

  return (
    <div className={s.userList}>
      {status === "pending" ? (
        "Loading..."
      ) : (
        <List
          items={users}
          resourceName="userItem"
          itemComponent={UserListItemWidget}
        />
      )}
    </div>
  );
};

const UserListItemWidget = ({ userItem }) => {
  return (
    <OpenUser user={userItem}>
      <div className={s.userItem}>
        <SmallUserListItem user={userItem}>
          <FollowButton id={userItem.id} />
        </SmallUserListItem>
      </div>
    </OpenUser>
  );
};
