import { useDispatch } from "react-redux";
import { deleteConversation } from "6_shared/store/conversationListSlice";
import { Button } from "6_shared/ui/Button";
import { useNavigate } from "react-router-dom";

export const DeleteConversation = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteConversation({ id }));
    navigate("/");
  };

  return <Button action={handleDelete}>Delete</Button>;
};
