import LobbyList from "./LobbyList";
import Navbar from "../Navbar";
import FilterLobby from "./FilterLobby";

import { SocketContext } from "../../context/socket";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import backBtn from "../../assets/icons/back.svg";

import styles from "../../styles/Games/Games.module.scss";

const Games = (props) => {
  const { userAuth, user, logout, updateUserAvatar } = props;
  const [lobbies, setLobbies] = useState();
  const [filteredLobbies, setFilteredLobbies] = useState();
  const socket = useContext(SocketContext);

  useEffect(() => {
    // Request list of lobbies to render
    socket.emit("Request Lobbies");

    // Render list of lobbies
    socket.on("Get Lobbies", (lobbies) => {
      setLobbies(lobbies);
      setFilteredLobbies(lobbies);
    });

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={styles.Homepage}></div>
      <Navbar userAuth={userAuth} updateUserAvatar={updateUserAvatar} user={user} logout={logout} />
      <div className={styles.container}>
        <FilterLobby lobbies={lobbies} setFilteredLobbies={setFilteredLobbies} />
        {filteredLobbies && <LobbyList lobbies={filteredLobbies} />}
      </div>
      <Link to="/" className={styles.back}>
        <img src={backBtn} alt="back button" />
      </Link>
    </>
  );
};

export default Games;
