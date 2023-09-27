import { useState } from "react";
import { useSocket } from "hooks/useSocket";
import s from "components/Input.module.scss";

const Input = ({ to }) => {
  const { socket } = useSocket();
  const [text, setText] = useState("");

  const handleCreate = () => {
    if (text) {
      socket.emit("messages/create", {
        text,
        to,
      });
    }
  };

  const handleChangeText = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <div className={s.inputMessage}>
      <input
        placeholder="Enter message..."
        value={text}
        onChange={handleChangeText}
      />
      <button
        disabled={!to || !text}
        onClick={handleCreate}
      >
        Send
      </button>
    </div>
  );
};

export default Input;
