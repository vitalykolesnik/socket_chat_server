import { useState } from "react";
import Header from "components/Header";
import Users from "components/Users";
import Messages from "components/Messages";
import Input from "components/Input";
import s from "components/Home.module.scss";

const Home = () => {
  const [to, setTo] = useState(null);

  return (
    <div className={s.container}>
      <Header />
      <div className={s.content}>
        <div className={s.chat}>
          <Users to={to} setTo={setTo} />
          <div className={s.conversation}>
            <Messages />
            <Input to={to} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
