import "../../styles/Game/Status.scss";
import Button from "../Button";
import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

const Status = (props) => {
  const { status, handleCommands, validate } = props;

  return (
    <>
      <AnimatePresence>
        {status === "player_turn" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0 }}
            className="player-turn"
          >
            -- YOUR TURN --
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === "player_attack" && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ ease: "easeInOut", duration: 0.1 }}
          >
            <Button
              onClick={() => handleCommands("Attack")}
              error
              disabled={!validate.attackButton}
            >
              ATTACK
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === "boss_attack" && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
          >
            <Button
              onClick={() => handleCommands("Discard")}
              error
              disabled={!validate.discardButton}
            >
              DISCARD
              <span className="count">
                {" "}
                {validate.discardValue > 0 ? validate.discardValue : ""}
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {status === "game_over_win" && (
        <>
          <div className="game-over">YOU WON</div>
          <Link to="/">
            <Button error>BACK TO MENU</Button>
          </Link>
        </>
      )}

      {status === "game_over_lose" && (
        <>
          <div className="game-over">YOU LOSE</div>
          <Link to="/">
            <Button error>BACK TO MENU</Button>
          </Link>
        </>
      )}
    </>
  );
};
export default Status;
