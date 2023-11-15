import { useDispatch } from "react-redux";
import { deleteMessage } from "6_shared/store/conversationSlice";
import { Button } from "6_shared/ui/Button";
import BASKET from "6_shared/assets/img/menu-dots.png";

export const DeleteMessage = ({ id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteMessage({ id }));
  };

  return (
    <Button action={handleDelete}>
      <img
        style={{
          width: "20px",
          height: "20px",
          objectFit: "cover",
        }}
        src={BASKET}
        alt=""
      />
    </Button>
  );
};
