import PlayerList from "../Game/PlayerList";
import DeckList from "./DeckList";
import Status from "./Status";
import PlayerAid from "./PlayerAid";
import Chat from "./Chat";
import Loading from "../Loading";

import { SocketContext } from "../../context/socket";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import useGame from "../../hooks/useGame";

import { motion, AnimatePresence } from "framer-motion";

import Confetti from "react-confetti";

import "../../styles/Game/Game.scss";
import closeIcon from "../../assets/icons/close-icon.svg";
import helpIcon from "../../assets/icons/help.png";
import styles from "../../styles/GameRoom/GameRoom.module.scss";

const Game = (props) => {
  const { user, link, game, startGame } = props;
  const socket = useContext(SocketContext);

  // Initializing Game States
  const {
    setup,
    setGame,
    updateGame,
    started,
    handleCommands,
    moveCardTo,
    players,
    currentPlayer,
    boss,
    status,
    validate,
    decks,
    messages,
    sendMessage,
  } = useGame(socket, link, user);

  const [animation, SetAnimation] = useState(true);

  // initial game set up
  useEffect(() => {
    if (game.started) {
      console.log("started", game);
      setGame(game);
    }
    if (user.host && !started) {
      setup(game.players, startGame);
    }

    socket.on("Update Game", (key, data) => {
      updateGame(key, data, false);
    });
  }, []);

  useEffect(() => {
    if (started) {
      SetAnimation(true);
    }
    setTimeout(() => {
      SetAnimation(false);
    }, 2000);
  }, [started]);

  const leaveRoom = () => {
    socket.emit("Leave Room", link);
  };

  return (
    <>
      <AnimatePresence>
        {animation && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.Loading}
            >
              <Loading />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {!animation && status === "game_over_win" && (
        <Confetti width={1900} height={950} />
      )}
      <AnimatePresence>
        {!animation && started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="Game"
          >
            <div className="background-gif"></div>
            <PlayerAid
              playerField={currentPlayer.field}
              status={status}
              jesterActive={boss.stats?.powerDisabled}
              bossSuit={boss.stats?.suit}
            />
            <DeckList
              tavern={decks.tavern}
              discard={decks.discard}
              castle={decks.castle}
              boss={boss}
            />
            <Status
              status={status}
              handleCommands={handleCommands}
              validate={validate}
              currentPlayer={currentPlayer}
            />
            <PlayerList
              players={players}
              user={user}
              moveCardTo={moveCardTo}
              status={status}
              boss={boss}
              currentPlayer={currentPlayer}
              handleCommands={handleCommands}
            />
            <motion.div className="close-icon">
              <Link to={"/"}>
                <img src={closeIcon} alt="" onClick={leaveRoom} />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.2 }}
              className="help-icon nes-pointer"
            >
              <a
                href="https://www.badgersfrommars.com/assets/RegicideRulesA4.pdf"
                target={"_blank"}
                rel="noreferrer"
              >
                <img src={helpIcon} alt="" />
              </a>
            </motion.div>
            <Chat messages={messages} sendMessage={sendMessage} user={user} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Game;
