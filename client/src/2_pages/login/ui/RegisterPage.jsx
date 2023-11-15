import s from "./AuthPage.module.scss";
import { useRef } from "react";
import { useToken } from "6_shared/hooks/useToken";
import { LinkTo } from "6_shared/ui/LinkTo";
import AVA from "6_shared/assets/img/picture.png";

export const RegisterPage = () => {
  const { handleSignup } = useToken();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <div className={s.container}>
      <div className={s.loginFormWrapper}>
        <span className={s.logo}>My Chat</span>
        <span className={s.title}>Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="name" />
          <input type="email" name="email" ref={emailRef} placeholder="email" />
          <input
            type="password"
            name="password"
            ref={passwordRef}
            placeholder="password"
          />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={AVA} alt="" />
            <span>Add an avatar</span>
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          You do have an account?
          <LinkTo className={s.link} to="/login">
            Login
          </LinkTo>
        </p>
      </div>
    </div>
  );
};
