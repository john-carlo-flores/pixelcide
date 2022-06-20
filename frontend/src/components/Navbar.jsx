import Login from "../components/Authentication/Login";

import "../styles/Navbar.scss";

import { motion, AnimatePresence } from "framer-motion";

import introMusic from "../assets/sounds/intro-music.mp3";

import useSound from "use-sound";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Avatar from "./Games/Avatar";

export default function Navbar(props) {
  const [login, setLogin] = useState(false);
  const { userAuth, logout } = props;
  const [playActive] = useSound(introMusic, { volume: 0.01 });
  const navigate = useNavigate();

  const toggleLoginForm = () => {
    setLogin((prev) => !prev);
  };

  const onLogout = (event) => {
    event.preventDefault();
    logout();
    navigate("/");
  };

  // useEffect(() => {
  //   props.user && playActive();
  // }, [props.user]);

  const [openAvatarList, setOpenAvatarList] = useState(true);

  const handleAvatarClick = () => {
    setOpenAvatarList((prev) => !prev);
  };

  const avatarIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const selectAvatar = (id, userId) => {
    // axios.put("http://localhost:8080/users", {
    //   user: {
    //     id: userId,
    //     avatar_id: id,
    //   },
    // });
  };

  return (
    <>
      <nav className="navbar">
        {/* <a className="how-to-play" href="https://www.badgersfrommars.com/assets/RegicideRulesA4.pdf" target="_blank" rel="noreferrer">
          How to Play
        </a> */}
        <div className="avatar-container" onClick={handleAvatarClick}>
          <div className="avatar-current">
            <Avatar id={props.user.avatar_id} />
          </div>
          {openAvatarList && (
            <div className="avatar-list">
              {avatarIds.map((id) => (
                <div key={id} className="avatar-list-item nes-pointer" onClick={() => selectAvatar(id, props.user.id)}>
                  <Avatar id={id} />
                </div>
              ))}
            </div>
          )}
        </div>

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
