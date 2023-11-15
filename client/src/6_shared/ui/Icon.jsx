import PHOTO from "6_shared/assets/img/user.png";

export const Icon = ({ src, ...other }) => {
  const { title } = other;

  return (
    <img
      style={{
        height: "32px",
        padding: "2px",
        borderRadius: "50%",
        backgroundColor: "white",
        border: "2px solid black",
      }}
      src={src || PHOTO}
      alt={title}
      title={title}
    />
  );
};
