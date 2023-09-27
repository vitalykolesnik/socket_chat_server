import { useRef } from "react";
import { Link } from "react-router-dom";
import { useToken } from "hooks/useToken";
import AVA from "img/picture.png";
import s from "components/Login.module.scss";

const Register = () => {
  const { handleSignup } = useToken();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup({
      user: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    });
  };

  return (
    <div className={s.loginFormContainer}>
      <div className={s.loginFormWrapper}>
        <span className={s.logo}>My Chat</span>
        <span className={s.title}>Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="name" />
          <input
            type="email"
            name="email"
            ref={emailRef}
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            ref={passwordRef}
            placeholder="password"
          />
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
          />
          <label htmlFor="file">
            <img src={AVA} alt="" />
            <span>Add an avatar</span>
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          You do have an account?
          <Link className={s.link} to="/signin">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
