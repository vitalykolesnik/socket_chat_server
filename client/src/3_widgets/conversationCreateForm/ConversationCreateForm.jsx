import s from "./ConversationCreateForm.module.scss";
import { useRef, useState } from "react";
import { CreateConversation } from "4_features/conversation/createConversation/CreateConveration";

export const ConversationCreateForm = () => {
  const titleRef = useRef(null);
  const [title, setTitle] = useState("");

  const afterCreate = () => {
    setTitle("");
  };

  return (
    <div className={s.container}>
      <textarea
        value={title}
        ref={titleRef}
        onChange={() => {
          setTitle(titleRef.current.value);
        }}
        placeholder="Type a conversation title"
        wrap="off"
        rows={1}
        maxLength={50}
      />
      <CreateConversation title={title} cb={afterCreate} />
    </div>
  );
};
