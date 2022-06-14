import Button from "../Button";

import { useState } from "react";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faGamepad, faKey, faLock, faHeadphones } from '@fortawesome/fontawesome-free-solid'

import "../../styles/Authentication/Registration.scss";

const Registration = (props) => {
  const { onSubmit } = props;
  const [error, setError] = useState();
  const navigate = useNavigate();

  const confirmRegistration = (event) => {
    event.preventDefault();

    const username = event.target.uname.value;
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.pass.value;
    const passwordConfirmation = event.target.passconf.value;

    console.log("HERE!");
    if (password !== passwordConfirmation) {
      console.log("Uh oh!");
      return setError("Passwords must match");
    }

    const user = {
      username,
      name,
      email,
      password,
      avatar_id: 1
    }

    console.log(user);

    onSubmit(user).then((result) => {
      console.log(result);
      navigate("/");
    });
  };

  return (
    <>
      <div className="Homepage"></div>
      <h1 className="Title">Pixelcide</h1>
      <div className={'form-register nes-container is-rounded'}>
        <form onSubmit={confirmRegistration}>
          <div className="nes-field is-inline">
            <label><FontAwesomeIcon icon={faGamepad} size="3x"/></label>
            <input className="nes-input" type="text" name="uname" placeholder="Username" required />
          </div>
          <div className="nes-field is-inline">
            <label><FontAwesomeIcon icon={faHeadphones} size="3x"/></label>
            <input className="nes-input" type="text" name="name" placeholder="Name" required />
          </div>
          <div className="nes-field is-inline">
            <label><FontAwesomeIcon icon={faEnvelope} size="3x"/></label>
            <input className="nes-input" type="email" name="email" placeholder="Email Address" required />
          </div>
          <div className="nes-field is-inline">
            <label><FontAwesomeIcon icon={faKey} size="3x"/></label>
            <input className="nes-input" type="password" name="pass" placeholder="Password" required />
          </div>
          <div className="nes-field is-inline">
            <label><FontAwesomeIcon icon={faLock} size="3x"/></label>
            <input className="nes-input" type="password" name="passconf" placeholder="Password Confirmation" required />
          </div>
          {error && <p>{error}</p>}
          <div className="button-container">
            <Button success>Register</Button>
            <Link to="/"><Button>Cancel</Button></Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;