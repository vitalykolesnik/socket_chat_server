import s from "./UsersPage.module.scss";
import { UserListWidget } from "3_widgets/userList/UserListWidget";

export const UsersPage = () => {
  return (
    <div className={s.container}>
      <UserListWidget />
    </div>
  );
};
