import Button from "../Button";
import Navbar from "../Navbar";
import LobbyCreation from "./LobbyCreation";
import "../../styles/Root/Homepage.scss";

import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/socket";

export default function Homepage(props) {
  const { user, userAuth, logout } = props;
  const { hostGame, lobby, assignLobbyTitle, cancelLobby, updateLobby } =
    props.state;
  const [createLobby, setCreateLobby] = useState({ create: false });
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  // Send Create Lobby Request to server
  const onHost = () => {
    hostGame(user);
  };

  // Update lobby title to server
  const onCreate = (title) => {
    assignLobbyTitle(title);
    navigate(`/games/${lobby.link}`);
  };

  // Delete lobby on server
  const onCancel = () => {
    cancelLobby();
    setCreateLobby(false);
  };

  useEffect(() => {
    // Add listener when new lobby is created
    socket.on("Get Created Lobby", (createdLobby) => {
      if (!createdLobby) {
        return setCreateLobby({
          error:
            "Reached maximum amount of rooms alloted. Please join existing games or try again later.",
        });
      }

      socket.emit("Join Room", createLobby.link);

      // Allow lobby creation
      setCreateLobby({ create: true });
      updateLobby(createdLobby);
    });
  }, []);

  return (
    <>
      <div className="Homepage"></div>
      <Navbar userAuth={userAuth} user={user} logout={logout} />
      <div className="Menu">
        <h1 className="Title">Pixelcide</h1>
        <div className="Buttons">
          {props.user && (
            <>
              <Button onClick={onHost} error>
                Host Game
              </Button>
              <Link to="games">
                <Button error>Join Game</Button>
              </Link>
              <Link to="statistics">
                <Button error>Statistics</Button>
              </Link>
              <Link to="leaderboard">
                <Button error>Leaderboard</Button>
              </Link>
            </>
          )}
          {!props.user && (
            <Link to="signup">
              <Button error>Sign Up</Button>
            </Link>
          )}
        </div>
      </div>
      {createLobby.create && (
        <LobbyCreation onCancel={onCancel} onCreate={onCreate} />
      )}
      {createLobby.error && <p>{createLobby.error}</p>}
    </>
  );
}
