import styles from '../../styles/Authentication/Login.module.scss';
import Button from '../Button';
import { motion, AnimatePresence } from 'framer-motion';

import { useState, useEffect } from 'react';

const Login = (props) => {
  const { userAuth, toggleLoginForm, visibleForm } = props;
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    setIsVisible(true);
  }, [login]);

  // const onCancel = (event) => {
  //   event.preventDefault();
  //   toggleLoginForm();
  // };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className={styles.invisibleContainer} onClick={() => setIsVisible((prev) => !prev)}>
          <motion.div
            className={`${styles.form} nes-container is-rounded`}
            initial={{ y: -200 }}
            animate={{ y: -40 }}
            exit={{ y: -500 }}
            transition={{ ease: 'easeOut', duration: 0.5, type: 'spring' }}
          >
            <form onSubmit={login}>
              <div className="nes-field">
                <input className="nes-input is-inline" placeholder="Username" type="text" name="uname" required />
              </div>
              <div className="nes-field">
                <input className="nes-input is-inline" type="password" name="pass" placeholder="Password" required />
              </div>
              {error && <p>Invalid Username/Password combination</p>}
              <div className={styles.buttonContainer}>
                <Button success>Login</Button>
                <Button onClick={() => setIsVisible((prev) => !prev)}>Cancel</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Login;
