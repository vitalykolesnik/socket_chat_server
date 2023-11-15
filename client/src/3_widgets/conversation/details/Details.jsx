import s from "./Details.module.scss";
import { DeleteConversation } from "4_features/conversation/deleteConversation/DeleteConversation";
import { Back } from "4_features/navigation/BackButton";
import { Button } from "6_shared/ui/Button";
import ICON from "6_shared/assets/img/mid_257392_631578.jpg";
import { useState } from "react";
import { MemberListWidget } from "..";

export const Details = ({ conversation }) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleShow = () => {
    setShowDialog((prev) => !prev);
  };

  return (
    <div className={s.details}>
      <h2>{conversation.title}</h2>
      <img src={conversation.icon || ICON} alt="" />
      <div className={s.actions}>
        <Button action={handleShow}>Members</Button>
        <Back />
        <DeleteConversation id={conversation.id} />
      </div>
      {showDialog && (
        <div className={s.modal}>
          <div className={s.content}>
            <MemberListWidget />
            <Button action={handleShow}>X</Button>
          </div>
        </div>
      )}
    </div>
  );
};
