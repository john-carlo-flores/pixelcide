import Button from "../Button";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGithubAlt } from 'react-icons/fa';
import { GiRetroController, GiAttachedShield, GiFragmentedSword } from 'react-icons/gi';
import { ImPacman } from "react-icons/im";

import styles from "../../styles/Authentication/Registration.module.scss";

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

    if (password !== passwordConfirmation) {
      return setError("Passwords must match");
    }

    const user = {
      username,
      name,
      email,
      password,
      avatar_id: 1
    }

    onSubmit(user).then((result) => {
      navigate("/");
    });
  };

  return (
    <>
      <div className={styles.Homepage}></div>
      <h1 className={styles.Title}>Pixelcide</h1>
      <div className={`${styles.form} nes-container is-rounded`}>
        <form onSubmit={confirmRegistration}>
          <div className="nes-field is-inline">
            <label><FaGithubAlt size={70}/></label>
            <input className="nes-input" type="text" name="uname" placeholder="Username" required />
          </div>
          <div className="nes-field is-inline">
            <label><ImPacman size={70}/></label>
            <input className="nes-input" type="text" name="name" placeholder="Name" required />
          </div>
          <div className="nes-field is-inline">
            <label><GiRetroController size={70}/></label>
            <input className="nes-input" type="email" name="email" placeholder="Email Address" required />
          </div>
          <div className="nes-field is-inline">
            <label><GiFragmentedSword size={70}/></label>
            <input className="nes-input" type="password" name="pass" placeholder="Password" required />
          </div>
          <div className="nes-field is-inline">
            <label><GiAttachedShield size={70}/></label>
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