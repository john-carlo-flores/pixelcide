import Button from '../Button';
import SeatList from './SeatList';
import { Link } from 'react-router-dom';

import styles from '../../styles/GameRoom/Room.module.scss';

const Room = (props) => {
  const { user, handleStartGame, seats, updateSeats, takeSeat, error } = props;

  return (
    <>
      <SeatList 
        user={user} 
        seats={seats}
        updateSeats={updateSeats} 
        takeSeat={takeSeat}
      />
      {error && (
        <div className={styles.error}>
          <span className={'nes-balloon from-left nes-pointer'}>{error}</span>
        </div>
      )}
      <div className={styles.buttonContainer}>
        <Button onClick={handleStartGame} success>Start Game</Button>
        <Link to="/games"><Button warning>Leave Lobby</Button></Link>
      </div>
    </>
  );
};

export default Room;