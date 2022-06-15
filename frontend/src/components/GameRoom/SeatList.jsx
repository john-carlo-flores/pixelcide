import Seat from './Seat';

import styles from '../../styles/GameRoom/SeatList.module.scss';

const SeatList = (props) => {
  const { user, seats, updateSeatCount, takeSeat } = props;

  return (
    <div className={styles.main}>
      <div className={styles.seatRow}>
        <Seat 
          user={user}
          number={1}
          playerSeated={seats.host}
          updateSeatCount={updateSeatCount}
          takeSeat={takeSeat}
        />
        <Seat 
          user={user}
          number={2}
          playerSeated={seats.player2}
          updateSeatCount={updateSeatCount}
          takeSeat={takeSeat}
        />
      </div>
      <div className={styles.seatRow}>
        <Seat 
          user={user}
          number={3}
          playerSeated={seats.player3}
          updateSeatCount={updateSeatCount}
          takeSeat={takeSeat}
        />
        <Seat 
          user={user}
          number={4}
          playerSeated={seats.player4}
          updateSeatCount={updateSeatCount}
          takeSeat={takeSeat}
        />
      </div>
    </div>
  );
};

export default SeatList;