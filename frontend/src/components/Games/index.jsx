import LobbyList from "./LobbyList";
import Navbar from "../Navbar";
import FilterLobby from "./FilterLobby";

import { SocketContext } from "../../context/socket";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { IoArrowBackCircle } from "react-icons/io5";
import styles from "../../styles/Games/Games.module.scss";

const Games = (props) => {
  const { userAuth, user, logout } = props;
  const [lobbies, setLobbies] = useState();

  const socket = useContext(SocketContext);

  useEffect(() => {
    // Request list of lobbies to render
    socket.emit("Request Lobbies");

    // Render list of lobbies
    socket.on("Get Lobbies", (lobbies) => {
      setLobbies(lobbies);
    });

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={styles.Homepage}></div>
      <Navbar userAuth={userAuth} user={user} logout={logout} />
      <div className={styles.container}>
        <FilterLobby lobbies={lobbies} setLobbies={lobbies} />
        {lobbies && <LobbyList lobbies={lobbies} />}
      </div>
      <Link to="/" className={styles.back}>
        <IoArrowBackCircle size={80} />
      </Link>
    </>
  );
};

export default Games;
