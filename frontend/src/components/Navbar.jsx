import Button from "../components/Button";
import Login from "../components/Authentication/Login";

import "../styles/Navbar.scss";

import { useState } from "react";

export default function Navbar(props) {
  const [login, setLogin] = useState(false);

  const { userAuth, logout } = props;

  const toggleLoginForm = () => {
    setLogin(prev => !prev);
  };

  return (
    <>
      <nav className="navbar">
        <a
          className="how-to-play"
          href="https://www.badgersfrommars.com/assets/RegicideRulesA4.pdf"
          target="_blank" rel="noreferrer"
        >
          How to Play
        </a>

        <div className="navbar-right">
          {!props.user && (
            <p onClick={toggleLoginForm} className="login nes-pointer" login>
              Login
            </p>
          )}
          {props.user && (
            <div className="user-logout">
              <p>Welcome {props.user.username} |</p>
              <p className="logout nes-pointer" onClick={logout}>
                &nbsp;Logout
              </p>
            </div>
          )}
        </div>
      </nav>
      {login && <Login userAuth={userAuth} toggleLoginForm={toggleLoginForm}/>}
    </>
  );
}