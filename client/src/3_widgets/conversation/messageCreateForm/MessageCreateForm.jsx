import s from "./MessageCreateForm.module.scss";
import { useState } from "react";
import { CreateMessage } from "4_features/message/createMessage/CreateMessage";

export const MessageCreateForm = ({ conversationId }) => {
  const [text, setText] = useState("");

  const handleChangeText = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.form}>
        <textarea
          placeholder="Enter message..."
          value={text}
          onChange={handleChangeText}
          rows={1}
        />
        <CreateMessage conversationId={conversationId} text={text} />
      </div>
    </div>
  );
};
