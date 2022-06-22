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
  // Initializing Game States
  const {
    setup,
    setGame,
    started,
    handleCommands,
    moveCardTo,
    players,
    currentPlayer,
    boss,
    status,
    validate,
    decks,
  } = useGame();
  const { user, link, game, gamePlayers, updateGame } = props;

  const socket = useContext(SocketContext);
  const [animation, SetAnimation] = useState(true);

  // initial game set up
  useEffect(() => {
    if (game.started) {
      setGame(game);
    } else {
      setup(game.players);
    }
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
        {!animation && (
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
            <Chat />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Game;
