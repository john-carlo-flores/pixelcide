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
  const { user, link, game, startGame, leaveRoom } = props;
  const socket = useContext(SocketContext);

  const [openDialog, setOpenDialog] = useState(false);

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
    }, 1000);
  }, [started]);

  const onConfirm = () => {
    handleCommands("Leave Lobby");
    leaveRoom();
  };

  const onBackToMenu = () => {
    handleCommands("Game Over");
    leaveRoom();
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
              onBackToMenu={onBackToMenu}
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

            <div className="close-icon nes-pointer">
              <img
                src={closeIcon}
                alt=""
                onClick={() => setOpenDialog((pre) => !pre)}
              />
            </div>

            {openDialog && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="close-dialog "
              >
                <p>Are you sure you wanna exit ?</p>
                <div className="confirm-btns">
                  <Link to={"/"}>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                      className="nes-btn is-error"
                      onClick={onConfirm}
                    >
                      Confirm
                    </motion.button>
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    className="nes-btn is-success"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            )}

            {openDialog && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="backdrop"
              ></motion.div>
            )}

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
