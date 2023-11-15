import { useDispatch } from "react-redux";
import { createConversation } from "6_shared/store/conversationListSlice";
import { Button } from "6_shared/ui/Button";

export const CreateConversation = ({ title, cb }) => {
  const dispatch = useDispatch();

  const handleCreate = () => {
    dispatch(createConversation({ title }));
    cb();
  };

  return (
    <Button disabled={!title} action={handleCreate}>
      Create
    </Button>
  );
};
