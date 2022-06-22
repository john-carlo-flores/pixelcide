import Empty from "./Empty";
import Button from "../Button";

import Avatar from "../Games/Avatar";

import styles from "../../styles/GameRoom/Seat.module.scss";

const Seat = (props) => {
  const { user, number, playerSeated, takeSeat, updateSeats } = props;
  const host = number === 0;

  const addSeat = () => {
    updateSeats("+", number);
  };

  const removeSeat = () => {
    updateSeats("-", number);
  };

  const occupySeat = () => {
    takeSeat(user, number);
  };

  return (
    <div className={styles.main}>
      {playerSeated !== "none" && playerSeated ? (
        <div className={`${styles.container} nes-container is-rounded`}>
          <div className={styles.header}>
            <h2>{!host ? "Player:" : "Host:"}</h2>
            {!host && user.host && (
              <Button onClick={removeSeat} error>
                X
              </Button>
            )}
          </div>
          <h2 className={styles.tag}>{playerSeated?.username || "<empty>"}</h2>
          {!host && !user.host && playerSeated?.empty ? (
            <div className={styles.btn}>
              <Button onClick={occupySeat}>Take Seat</Button>
            </div>
          ) : (
            <div className={styles.footer}>
              {!playerSeated.empty && <Avatar id={playerSeated.avatar_id} />}
            </div>
          )}
        </div>
      ) : (
        user.host && (
          <div className={styles.empty}>
            <Empty onClick={addSeat} />
          </div>
        )
      )}
    </div>
  );
};

export default Seat;
