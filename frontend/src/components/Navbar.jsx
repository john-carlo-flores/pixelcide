import Login from '../components/Authentication/Login';

import '../styles/Navbar.scss';

import { motion, AnimatePresence } from 'framer-motion';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  const [login, setLogin] = useState(false);
  const { userAuth, logout } = props;
  const navigate = useNavigate();

  const toggleLoginForm = () => {
    setLogin((prev) => !prev);
  };

  const onLogout = (event) => {
    event.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="navbar">
        <a className="how-to-play" href="https://www.badgersfrommars.com/assets/RegicideRulesA4.pdf" target="_blank" rel="noreferrer">
          How to Play
        </a>

        <div className="navbar-right">
          {!props.user && (
            <p onClick={toggleLoginForm} className="login nes-pointer">
              Login
            </p>
          )}
          {props.user && (
            <div className="user-logout">
              <p>Welcome {props.user.username} |</p>
              <p className="logout nes-pointer" onClick={onLogout}>
                &nbsp;Logout
              </p>
            </div>
          )}
        </div>
      </nav>
      <AnimatePresence>
        {login && (
          <motion.div animate={{ y: 270 }} exit={{ y: -320 }}>
            <Login userAuth={userAuth} toggleLoginForm={toggleLoginForm} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
