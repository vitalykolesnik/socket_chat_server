import { useRef } from "react";
import { Link } from "react-router-dom";
import { useToken } from "hooks/useToken";
import s from "components/Login.module.scss";

const Login = () => {
  const { handleLogin } = useToken();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({
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
        <span className={s.title}>Login</span>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Sign in</button>
        </form>
        <p>
          You don't have an account?
          <Link className={s.link} to="/signup">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
