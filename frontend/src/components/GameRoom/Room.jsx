import Button from '../Button';
import SeatList from './SeatList';
import { Link } from 'react-router-dom';

import styles from '../../styles/GameRoom/Room.module.scss';

const Room = (props) => {
  const { user, handleStartGame, seats, updateSeatCount, takeSeat } = props;

  return (
    <>
      <SeatList 
        user={user} 
        seats={seats}
        updateSeatCount={updateSeatCount} 
        takeSeat={takeSeat}
      />
      <div className={styles.buttonContainer}>
        <Button onClick={handleStartGame}>Start Game</Button>
        <Link to="/games"><Button>Leave Lobby</Button></Link>
      </div>
    </>
  );
};

export default Room;