import {
  useEffect,
  useState,
  useRef,
} from "react";
import { useSocket } from "hooks/useSocket";
import s from "components/Messages.module.scss";

const Messages = () => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.emit("messages/getAll");

      socket.on("messages/update", () => {
        socket.emit("messages/getAll");
      });

      socket.on(
        "messages/update-response",
        setMessages
      );
    }
  }, [socket]);

  const handleDelete = (id) => {
    socket.emit("messages/delete", id);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      begavior: "smooth",
    });
  }, [messages]);

  const messagesList = messages.map((m) => {
    return (
      <div className={s.message} key={m.id}>
        <div className={s.info}>
          <h5>
            {m.from.email} {"->"} {m.to.email}:
          </h5>
          <button
            onClick={() => handleDelete(m.id)}
          >
            X
          </button>
        </div>
        <span>{m.text}</span>
      </div>
    );
  });

  return (
    <div className={s.messagesList}>
      {messagesList}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default Messages;
