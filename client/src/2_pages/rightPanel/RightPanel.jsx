import { ConversationCreateForm } from "3_widgets/conversationCreateForm/ConversationCreateForm";
import { ConversationListWidget } from "3_widgets/conversationList";

export const RightPanel = () => {
  return (
    <>
      <ConversationCreateForm />
      <ConversationListWidget />
    </>
  );
};
