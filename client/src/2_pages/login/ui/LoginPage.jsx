import s from "./AuthPage.module.scss";
import { useRef } from "react";
import { LinkTo } from "6_shared/ui/LinkTo";
import { useToken } from "6_shared/hooks/useToken";

export const LoginPage = () => {
  const { handleLogin } = useToken();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <div className={s.container}>
      <div className={s.loginFormWrapper}>
        <span className={s.logo}>My Chat</span>
        <span className={s.title}>Login</span>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            ref={emailRef}
            placeholder="email"
            autoComplete="true"
          />
          <input
            type="password"
            name="password"
            ref={passwordRef}
            placeholder="password"
            autoComplete="false"
          />
          <button type="submit">Sign in</button>
        </form>
        <p>
          You don't have an account?
          <LinkTo className={s.link} to="/signup">
            Register
          </LinkTo>
        </p>
      </div>
    </div>
  );
};
