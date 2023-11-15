import { LinkTo } from "6_shared/ui/LinkTo";

export const OpenUser = ({ user, children }) => {
  return <LinkTo to={`/user/${user.id}`}>{children}</LinkTo>;
};
