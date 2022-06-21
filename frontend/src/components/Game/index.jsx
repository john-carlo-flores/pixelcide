import PlayerList from "../Game/PlayerList";
import DeckList from "./DeckList";
import Status from "./Status";
import PlayerAid from "./PlayerAid";
import Loading from "../Loading";

import { useEffect } from "react";
import useGame from "../../hooks/useGame";

import { AnimateSharedLayout } from "framer-motion";

import "../../styles/Game/Game.scss";
import closeIcon from "../../assets/icons/close-icon.svg";

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
      {!started ? (
        <Loading />
      ) : (
        <div className="Game">
          <div className="background-gif"></div>
          <PlayerAid
            playerField={currentPlayer.field}
            status={status}
            jester={boss.stats?.powerEnabled}
            bossSuit={boss.stats?.suit}
          />
          <DeckList
            tavern={decks.tavern}
            discard={decks.discard}
            castle={decks.castle}
            boss={boss}
          />
          <AnimateSharedLayout>
            {/* <motion.div> */}
            <Status
              status={status}
              handleCommands={handleCommands}
              validate={validate}
              currentPlayer={currentPlayer}
            />
            {/* </motion.div> */}
          </AnimateSharedLayout>
          <PlayerList
            players={players}
            user={user}
            moveCardTo={moveCardTo}
            status={status}
            bossSuit={boss.stats?.suit}
            currentPlayer={currentPlayer}
          />
          <div className="close-icon">
            <img src={closeIcon} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default Game;
