import { LinkTo } from "6_shared/ui/LinkTo";

export const OpenConversation = ({ id, children }) => {
  return <LinkTo to={`/${id}`}>{children}</LinkTo>;
};
