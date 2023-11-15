import s from "./MemberListWidget.module.scss";
import { OpenUser } from "4_features/navigation/openUser/OpenUser";
import USER from "6_shared/assets/img/user.png";
import { List } from "6_shared/ui/List";
import { useSelector } from "react-redux";
import { conversationMembersSelector } from "6_shared/store/conversationSlice";

export const MemberListWidget = () => {
  const members = useSelector(conversationMembersSelector);

  return (
    <div className={s.membersList}>
      <List
        items={members}
        resourceName="user"
        itemComponent={MemberListItemWidget}
      />
    </div>
  );
};

const MemberListItemWidget = ({ user }) => {
  return (
    <OpenUser style={{ textDecoration: "none" }} user={user}>
      <div className={s.memberItem} key={user.id}>
        <img
          src={user.info.avatar || USER}
          alt=""
          title={user.info.username || user.email}
        />
      </div>
    </OpenUser>
  );
};
