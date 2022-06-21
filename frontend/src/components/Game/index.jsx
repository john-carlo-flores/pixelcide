import PlayerList from "../Game/PlayerList";
import DeckList from "./DeckList";
import Status from "./Status";
import PlayerAid from "./PlayerAid";
import Chat from "./Chat";
import Loading from "../Loading";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGame from "../../hooks/useGame";

import { motion } from "framer-motion";

import Confetti from "react-confetti";

import "../../styles/Game/Game.scss";
import closeIcon from "../../assets/icons/close-icon.svg";
import helpIcon from "../../assets/icons/help.png";

const Game = (props) => {
  // Initializing Game States
  const { setup, setGame, started, handleCommands, moveCardTo, players, currentPlayer, boss, status, validate, decks } = useGame();
  const { user, game, gamePlayers, updateGame } = props;

  // initial game set up
  useEffect(() => {
    if (game.started) {
      setGame(game);
    } else {
      setup(gamePlayers);
    }
  }, []);

  return (
    <>
      {!started && <Loading />}
      {started && status === "game_over_win" && <Confetti width={1900} height={950} />}
      {started && (
        <div className="Game">
          <div className="background-gif"></div>
          <PlayerAid playerField={currentPlayer.field} status={status} jester={boss.stats?.powerEnabled} bossSuit={boss.stats?.suit} />
          <DeckList tavern={decks.tavern} discard={decks.discard} castle={decks.castle} boss={boss} />
          <Status status={status} handleCommands={handleCommands} validate={validate} currentPlayer={currentPlayer} />
          <PlayerList players={players} user={user} moveCardTo={moveCardTo} status={status} bossSuit={boss.stats?.suit} currentPlayer={currentPlayer} />
          <motion.div title="Exit Game?" whileHover={{ scale: 1.2 }} className="close-icon">
            <Link to={"/"}>
              <img src={closeIcon} alt="" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.2 }} className="help-icon nes-pointer">
            <a href="https://www.badgersfrommars.com/assets/RegicideRulesA4.pdf" target={"_blank"}>
              <img src={helpIcon} alt="" />
            </a>
          </motion.div>
          <Chat />
        </div>
      )}
    </>
  );
};

export default Game;
