import { Link } from "react-router-dom";

export const LinkTo = ({ to, children, ...props }) => {
  return (
    <Link style={{ textDecoration: "none" }} to={to} {...props}>
      {children}
    </Link>
  );
};
