import LobbyList from "./LobbyList";
import Navbar from "../Navbar";
import FilterLobby from "./FilterLobby";

import { SocketContext } from "../../context/socket";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/Games/Games.module.scss";

const Games = (props) => {
  const { userAuth, user, logout } = props;
  const [ lobbies, setLobbies ] = useState({});
  
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit("Request Lobbies");

    socket.on("Get Lobbies", (lobbies) => {
      setLobbies(lobbies);
    });
  }, []);

  return (
    <>
      <div className={styles.Homepage}></div>
      <Navbar userAuth={userAuth} user={user} logout={logout} />
      <FilterLobby lobbies={lobbies} setLobbies={lobbies} />
      <LobbyList lobbies={lobbies}/>
      <Link to="/">Back to home page</Link>
    </>
  );
};

export default Games;