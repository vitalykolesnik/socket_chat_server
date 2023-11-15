import s from "./MessageListWidget.module.scss";
import { useEffect, useRef } from "react";
import moment from "moment";
// import { useSocket } from "hooks/useSocket";
import { DeleteMessage } from "4_features/message/deleteMessage/DeleteMessage";
import { List } from "6_shared/ui/List";

export const MessageListWidget = ({ messages }) => {
  // const { socket } = useSocket();

  const scrollRef = useRef(null);

  // useEffect(() => {
  //   if (socket) {
  //     socket.emit("messages/getAll");

  //     socket.on("messages/update", () => {
  //       socket.emit("messages/getAll");
  //     });

  //     socket.on(
  //       "messages/update-response",
  //       setMessages
  //     );
  //   }
  // }, [socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      begavior: "smooth",
    });
  }, [messages]);

  return (
    <div className={s.messageList}>
      <List
        items={messages}
        resourceName="message"
        itemComponent={MessageWidget}
      />
      <div ref={scrollRef}></div>
    </div>
  );
};

const MessageWidget = ({ message }) => {
  const title = message.from.info?.username || message.from.email;

  return (
    <div className={s.message}>
      <div className={s.info}>
        <img src={message.from.info?.avatart} alt={title} />
        <h5>{title}</h5>
        {moment(message.createdAt).utc(true).fromNow()}
      </div>
      <span>{message.text}</span>
      <DeleteMessage id={message.id} />
    </div>
  );
};
