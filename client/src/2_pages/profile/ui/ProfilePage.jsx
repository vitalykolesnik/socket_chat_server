import s from "./ProfilePage.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Profile } from "3_widgets/user";
import {
  fetchUser,
  userStatusSelector,
  userErrorSelector,
  selectedUserSelector,
} from "6_shared/store/userSlice";

export const ProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectedUserSelector);
  const status = useSelector(userStatusSelector);
  const error = useSelector(userErrorSelector);

  useEffect(() => {
    dispatch(fetchUser({ id }));
  }, [id, dispatch]);

  if (error) return `Error: ${error.message}`;

  return (
    <div className={s.container}>
      {status === "pending"
        ? "Loading..."
        : user && (
            <>
              <Profile user={user} />
            </>
          )}
    </div>
  );
};
