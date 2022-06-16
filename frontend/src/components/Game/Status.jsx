import '../../styles/Game/Status.scss';
import Button from '../Button';
import { Link } from 'react-router-dom';

const Status = (props) => {
  const { status, handlePlayerAttack, handleBossAttack } = props;

  return (
    <>
      {status === 'player_turn' && <div className="player-turn">YOUR TURN</div>}

      {status === 'player_attack' && (
        <Button onClick={handlePlayerAttack} error>
          ATTACK
        </Button>
      )}

      {status === 'boss_attack' && (
        <Button onClick={handleBossAttack} error>
          DISCARD
        </Button>
      )}

      {status === 'game_over_win' && (
        <>
          <div className="game-over">YOU WON</div>
          <Link to="/">
            <Button error>BACK TO MENU</Button>
          </Link>
        </>
      )}

      {status === 'game_over_lose' && (
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
