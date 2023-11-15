import s from "./ConversationListWidget.module.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { OpenConversation } from "4_features/navigation/openConversation/OpenConversation";
import {
  fetchConversationList,
  conversationsSelector,
  conversationsErrorSelector,
  conversationsStatusSelector,
} from "6_shared/store/conversationListSlice";
import { List } from "6_shared/ui/List";
import ICON from "6_shared/assets/img/paper-plane.png";

export const ConversationListWidget = () => {
  const dispatch = useDispatch();
  const conversations = useSelector(conversationsSelector);
  const error = useSelector(conversationsErrorSelector);
  const status = useSelector(conversationsStatusSelector);

  useEffect(() => {
    dispatch(fetchConversationList());
  }, [dispatch]);

  if (error) return `Error: ${error.message}`;

  return (
    <div className={s.conversationList}>
      {status === "pending" ? (
        "Loading..."
      ) : (
        <List
          items={conversations}
          resourceName="conversation"
          itemComponent={ConversationListItemWidget}
        />
      )}
    </div>
  );
};

const ConversationListItemWidget = ({ conversation }) => {
  return (
    <OpenConversation id={conversation.id}>
      <div className={s.conversationItem}>
        <img src={conversation.icon || ICON} alt={conversation.title} />
        <h3>{conversation.title}</h3>
      </div>
    </OpenConversation>
  );
};
