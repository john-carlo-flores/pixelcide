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
    updateLobby,
    mode,
    seats,
    game,
    error,
  } = props.state;

  useEffect(() => {
    // Only reload lobby data if not created by host
    // Prevents issue with title updated after request
    if (user.username !== lobby?.host && !lobby?.title) {
      // Request lobby object based on url parameter
      socket.emit("Request Lobby", id);
    } else {
      // Update state to Room
      updateLobby(lobby, "Room");
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
      updateLobby(newLobby, "Room");
    });

    // Listens for all update lobby broadcasts
    socket.on("Update Lobby", (lobby) => {
      updateLobby(lobby);
    });

    // eslint-disable-next-line
  }, [socket]);

  const fakePlayers = [
    {
      id: 1,
      username: "picklerick",
      avatar_id: 1,
    },
    {
      id: 2,
      username: "hyrule",
      avatar_id: 2,
    },
    {
      id: 3,
      username: "gagan420",
      avatar_id: 3,
    },
    {
      id: 4,
      username: "momotrq94",
      avatar_id: 4,
    },
  ];

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
            handleStartGame={startGame}
            seats={seats}
            updateSeats={updateSeats}
            takeSeat={takeSeat}
            error={error}
          />
        </>
      )}
      {mode === "Loading" && <Loading />}
      {mode === "Game" && (
        <Game user={user} game={game} gamePlayers={fakePlayers} />
      )}
    </>
  );
};

export default GameRoom;
