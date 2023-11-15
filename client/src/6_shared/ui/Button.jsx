import s from "./Button.module.scss";

export const Button = ({ children, ...props }) => {
  const { action } = props;

  const handleClick = (e) => {
    e.preventDefault();
    action();
  };

  return (
    <button className={s.button} onClick={handleClick}>
      {children}
    </button>
  );
};
