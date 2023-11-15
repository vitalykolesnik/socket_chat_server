import s from "./ConversationPage.module.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MessageCreateForm,
  MessageListWidget,
  Details,
} from "3_widgets/conversation";
import {
  conversationCurrentSelector,
  conversationErrorSelector,
  fetchConversation,
} from "6_shared/store/conversationSlice";

export const ConversationPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const conversation = useSelector(conversationCurrentSelector);
  const error = useSelector(conversationErrorSelector);
  const status = useSelector(conversationErrorSelector);

  useEffect(() => {
    dispatch(fetchConversation({ id }));
  }, [id, dispatch]);

  if (error) return `Error: ${error}`;

  return (
    <div className={s.container}>
      {status === "pending"
        ? "Loading..."
        : conversation && (
            <>
              <Details conversation={conversation} />
              <MessageListWidget messages={conversation.messages} />
              <MessageCreateForm conversationId={conversation.id} />
            </>
          )}
    </div>
  );
};
