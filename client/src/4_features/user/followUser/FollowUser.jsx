import { useDispatch, useSelector } from "react-redux";
import { followUser, profileSelector } from "6_shared/store/authSlice";
import { Button } from "6_shared/ui/Button";

export const FollowUser = ({ id, children }) => {
  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);

  const handleFollow = () => {
    dispatch(followUser({ id }));
  };

  return (
    profile.id !== id && (
      <Button action={handleFollow} title="follow/unfollow">
        {children}
      </Button>
    )
  );
};
