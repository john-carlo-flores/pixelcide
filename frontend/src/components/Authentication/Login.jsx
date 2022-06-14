import "../../styles/Authentication/Login.scss";
import Button from "../Button";

import classNames from "classnames";
import { useState } from "react";

const Login = (props) => {
  const { userAuth, toggleLoginForm } = props;
  const [ error, setError ] = useState(false);
  
  const loginFormClasses = classNames('form nes-container is-rounded');

  const login = (event) => {
    event.preventDefault();
    const username = event.target.uname.value;
    const password = event.target.pass.value;

    userAuth(username, password)
      .then(response => {
        if (response) {
          setError(false);
          return toggleLoginForm();
        }
          
        setError(true);
      });
  };

  return (
    <div className={loginFormClasses}>
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
         <Button onClick={toggleLoginForm}>Cancel</Button>
       </div>
     </form>
   </div>
  );
};

export default Login;