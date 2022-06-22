import Button from "../Button";
import Navbar from "../Navbar";
import LobbyCreation from "./LobbyCreation";
import "../../styles/Root/Homepage.scss";

import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/socket";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

export default function Homepage(props) {
  const { user, userAuth, logout, updateUserAvatar } = props;
  const { hostGame, lobby, assignLobbyTitle, cancelLobby, updateLocalLobby } =
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
      updateLocalLobby(createdLobby);
    });
  }, []);

  return (
    <>
      <div className="Homepage"></div>
      <Navbar
        updateUserAvatar={updateUserAvatar}
        userAuth={userAuth}
        user={user}
        logout={logout}
      />
      <div className="Menu">
        <h1 className="Title">Pixelcide</h1>
        <div className="Buttons">
          <LayoutGroup>
            <AnimatePresence>
              {props.user && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -200 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -200 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Button onClick={onHost} error>
                      Host Game
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -200 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -200 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Link to="games">
                      <Button error>Join Game</Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -200 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -200 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to="statistics">
                      <Button error>Statistics</Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -200 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -200 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to="leaderboard">
                      <Button error>Leaderboard</Button>
                    </Link>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {!props.user && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: -600 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 120 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link to="signup">
                    <Button error>Sign Up</Button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </div>
      {createLobby.create && (
        <LobbyCreation onCancel={onCancel} onCreate={onCreate} />
      )}
      {createLobby.error && <p>{createLobby.error}</p>}
    </>
  );
}
