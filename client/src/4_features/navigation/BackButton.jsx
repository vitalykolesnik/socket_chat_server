import { Button } from "6_shared/ui/Button";
import { useNavigate } from "react-router-dom";

export const Back = () => {
  const navigate = useNavigate();

  const handleAction = () => {
    navigate(-1);
  };

  return <Button action={handleAction}>Back</Button>;
};
