import Game from "../Game";
import Room from "./Room";
import Loading from "../Loading";

import Navbar from "../Navbar";

import { useEffect, useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/socket";

import styles from "../../styles/GameRoom/GameRoom.module.scss";

const GameRoom = (props) => {
  const { user, userAuth, logout, updateUserAvatar } = props;

  const { id } = useParams();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const {
    lobby,
    takeSeat,
    updateSeats,
    startGame,
    setupGame,
    updateGame,
    updateLocalLobby,
    cancelLobby,
    mode,
    seats,
    game,
    error,
  } = props.state;

  const leaveRoom = () => {
    // If user leaves lobby, cancel it
    if (user.host) {
      cancelLobby();
    }

    // leave lobby room listener and join lobbies listener
    socket.emit("Leave Room", id);
    socket.emit("Join Room", "lobbies");
  };

  useEffect(() => {
    // Only reload lobby data if not created by host
    // Prevents issue with title updated after request
    if (user.username !== lobby?.host && !lobby?.title) {
      // Request lobby object based on url parameter
      socket.emit("Request Lobby", id);
    } else {
      const newMode = lobby.game.started ? "Game" : "Room";
      // Update state to Room
      updateLocalLobby(lobby, newMode);
    }

    // Check and assign if user is host
    if (lobby?.host === user.username) {
      user.host = true;
    }

    // Join room once link is established
    socket.emit("Join Room", id);

    // Listener for reply from request lobby
    socket.on("Get Lobby", (newLobby) => {
      // If none found, invalid room
      if (!newLobby) {
        navigate("/"); // Return to home page
      }

      // Check and assign if user is host
      if (newLobby?.host === user.username) {
        user.host = true;
      }

      if (user.host && newLobby.title === "") {
        newLobby.mode = lobby.mode;
      }

      // Set lobby based on recieved lobby from listener and update mode
      const newMode = lobby.game.started ? "Game" : "Room";
      updateLocalLobby(newLobby, newMode);
    });

    // Listens for all update lobby broadcasts
    socket.on("Update Lobby", (lobby) => {
      const newMode = lobby.game.started ? "Game" : "Room";

      updateLocalLobby(lobby, newMode);
    });

    // eslint-disable-next-line
  }, []);

  console.log("GameRoom mode:", lobby);

  return (
    <>
      {(mode === "Room" || mode === "Loading") && (
        <>
          <div className={styles.Homepage}></div>
          <Navbar
            userAuth={userAuth}
            user={user}
            logout={logout}
            updateUserAvatar={updateUserAvatar}
          />
        </>
      )}
      {mode === "Room" && (
        <>
          <h1 className={styles.Title}>{`<${lobby.title}>`}</h1>
          <Room
            user={user}
            handleSetupGame={setupGame}
            seats={seats}
            updateSeats={updateSeats}
            takeSeat={takeSeat}
            error={error}
            leaveRoom={leaveRoom}
          />
        </>
      )}
      {mode === "Loading" && <Loading />}
      {((mode === "Setup" && user.host) || mode === "Game") && (
        <Game
          user={user}
          game={game}
          link={id}
          startGame={startGame}
          updateGame={updateGame}
        />
      )}
    </>
  );
};

export default GameRoom;
