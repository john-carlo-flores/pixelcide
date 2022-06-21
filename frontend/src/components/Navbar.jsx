import Login from "../components/Authentication/Login";

import "../styles/Navbar.scss";

import { motion, AnimatePresence } from "framer-motion";

import introMusic from "../assets/sounds/intro-music.mp3";

import useSound from "use-sound";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../hooks/useOnClickOutside";

import Avatar from "./Games/Avatar";

export default function Navbar(props) {
  const [login, setLogin] = useState(false);
  const { userAuth, logout, updateUserAvatar, user } = props;
  const [playActive] = useSound(introMusic, { volume: 0.01 });
  const [openAvatarList, setOpenAvatarList] = useState(false);
  const navigate = useNavigate();

  const toggleLoginForm = () => {
    setLogin((prev) => !prev);
  };

  const onLogout = (event) => {
    event.preventDefault();
    logout();
    setOpenAvatarList(false);
    navigate("/");
  };

  const handleAvatarClick = () => {
    setOpenAvatarList((prev) => !prev);
  };

  const avatarIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const selectAvatar = (avatar_id) => {
    updateUserAvatar(avatar_id);
    setOpenAvatarList(false);
  };

  //close avatar tray on clicking outside
  const ref = useRef();
  useOnClickOutside(ref, () => setOpenAvatarList(false));

  return (
    <>
      <nav className="navbar">
        <div className="avatar-container" ref={ref}>
          <div className="avatar-current nes-pointer" onClick={handleAvatarClick}>
            {user && <Avatar id={user?.avatar_id} />}
          </div>
          <AnimatePresence>
            {openAvatarList && (
              <motion.div initial={{ x: -200 }} exit={{ x: -400 }} animate={{ x: 0 }} className="avatar-list nes-container is-rounded">
                {avatarIds.map((id) => (
                  <div key={id} className="avatar-list-item nes-pointer" onClick={() => selectAvatar(id)}>
                    <Avatar id={id} />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="navbar-right">
          {!user && (
            <p onClick={toggleLoginForm} className="login nes-pointer">
              Login
            </p>
          )}
          {user && (
            <div className="user-logout">
              <p>Welcome {user.username} |</p>
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
