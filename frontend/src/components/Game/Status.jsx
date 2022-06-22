import "../../styles/Game/Status.scss";
import Button from "../Button";
import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { FaRegFlag } from "react-icons/fa";

const Status = (props) => {
  const { status, handleCommands, validate, currentPlayer } = props;

  return (
    <div className="Status">
      <AnimatePresence>
        {status === "player_turn" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: "easeOut", duration: 0.2 }} className="player-turn center">
            {`-- ${currentPlayer.username}'s TURN --`}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === "boss_turn" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ ease: "easeOut", duration: 0.2 }} className="player-turn center red">
            -- Enemy TURN --
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === "player_attack" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <div className="attack-div center">
              <Button onClick={() => handleCommands("Attack")} error disabled={!validate.attackButton}>
                ATTACK
              </Button>
              <Button onClick={() => handleCommands("Yield")}>
                <FaRegFlag size={25} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === "boss_attack" && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="center"
          >
            <Button onClick={() => handleCommands("Discard")} error disabled={!validate.discardButton}>
              DISCARD
              <span className="count"> {validate.discardValue > 0 ? validate.discardValue : ""}</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {status === "game_over_win" && (
        <div className="center">
          <div className="game-over">YOU WON</div>
          <Link to="/">
            <Button error>BACK TO MENU</Button>
          </Link>
        </div>
      )}

      {status === "game_over_lose" && (
        <div className="loser">
          <div>
            <Link to="/">
              <Button error>BACK TO MENU</Button>
            </Link>
          </div>
          <div className="game-over">YOU LOSE</div>
        </div>
      )}
    </div>
  );
};
export default Status;
