import { useDispatch } from "react-redux";
import { addMessage } from "6_shared/store/conversationSlice";
import { Button } from "6_shared/ui/Button";

export const CreateMessage = ({ conversationId, text }) => {
  const dispatch = useDispatch();

  const handleCreate = () => {
    dispatch(
      addMessage({
        conversationId,
        text,
      })
    );
  };

  return (
    <Button disabled={!text} action={handleCreate}>
      Send
    </Button>
  );
};
