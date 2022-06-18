import "../../styles/Game/Status.scss";
import Button from "../Button";
import { Link } from "react-router-dom";

const Status = (props) => {
  const {
    status,
    handlePlayerAttack,
    handleBossAttack,
    validateDiscard,
    validateAttack,
    discardVal,
    jester,
  } = props;

  return (
    <>
      {status === "player_turn" && <div className="player-turn">YOUR TURN</div>}

      {status === "player_attack" && (
        <Button onClick={handlePlayerAttack} error disabled={!validateAttack}>
          ATTACK
        </Button>
      )}

      {status === "boss_attack" && (
        <Button onClick={handleBossAttack} error disabled={!validateDiscard}>
          DISCARD
          <span className="count"> {discardVal > 0 ? discardVal : ""}</span>
        </Button>
      )}

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
      {jester && <div className="jester-active">Jester Active</div>}
    </>
  );
};
export default Status;
