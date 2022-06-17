import Seat from './Seat';

import styles from '../../styles/GameRoom/SeatList.module.scss';

const SeatList = (props) => {
  const { user, seats, updateSeats, takeSeat } = props;

  return (
    <div className={styles.main}>
      <div className={styles.seatRow}>
        <Seat 
          user={user}
          number={0}
          playerSeated={seats[0]}
          updateSeats={updateSeats}
          takeSeat={takeSeat}
        />
        <Seat 
          user={user}
          number={1}
          playerSeated={seats[1]}
          updateSeats={updateSeats}
          takeSeat={takeSeat}
        />
      </div>
      <div className={styles.seatRow}>
        <Seat 
          user={user}
          number={2}
          playerSeated={seats[2]}
          updateSeats={updateSeats}
          takeSeat={takeSeat}
        />
        <Seat 
          user={user}
          number={3}
          playerSeated={seats[3]}
          updateSeats={updateSeats}
          takeSeat={takeSeat}
        />
      </div>
    </div>
  );
};

export default SeatList;