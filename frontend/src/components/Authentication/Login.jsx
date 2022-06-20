import Button from "../Button";

import { useState, useRef } from "react";

import "../../styles/Authentication/Login.scss";

import useOnClickOutside from "../../hooks/useOnClickOutside";

const Login = (props) => {
  const { userAuth, toggleLoginForm } = props;
  const [error, setError] = useState(false);

  //detect click outside form
  const ref = useRef();
  useOnClickOutside(ref, () => toggleLoginForm());

  const login = (event) => {
    event.preventDefault();
    const username = event.target.uname.value;
    const password = event.target.pass.value;

    userAuth(username, password).then((response) => {
      if (response) {
        setError(false);
        return toggleLoginForm();
      }

      setError(true);
    });
  };

  const onCancel = (event) => {
    event.preventDefault();
    toggleLoginForm();
  };

  return (
    <div className={"form-login nes-container is-rounded"} ref={ref}>
      <form onSubmit={login}>
        <div className="nes-field">
          <input className="nes-input is-inline" placeholder="Username" type="text" name="uname" required />
        </div>
        <div className="nes-field">
          <input className="nes-input is-inline" type="password" name="pass" placeholder="Password" required />
        </div>
        {error && <p>Invalid Username/Password combination</p>}
        <div className="button-container for">
          <Button success>Login</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
