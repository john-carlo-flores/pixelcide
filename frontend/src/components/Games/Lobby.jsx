import Button from "../Button";
import AvatarList from "./AvatarList";

import { Link } from "react-router-dom";

import styles from "../../styles/Games/Lobby.module.scss";

const Lobby = (props) => {
  const { lobby, seats, onClick } = props;

  // Get number of seats and maxSeats from lobby.game.players
  const { seatCount, maxSeats } = seats.reduce(
    (total, seat) => {
      total.maxSeats += seat !== "none" ? 1 : 0;
      total.seatCount += seat?.id ? 1 : 0;
      return total;
    },
    { maxSeats: 0, seatCount: 0 }
  );

  // Prepare seat information to display
  const seatStatus = `${seatCount}/${maxSeats}`;
  const full = seatCount === maxSeats;

  const mode = lobby.mode;

  // list valid avatar ids in filled seats
  const avatars = seats.map((seat) => seat.avatar_id).filter((id) => id);

  return (
    <div className={`${styles.container} nes-container is-rounded`}>
      <div className={styles.header}>
        <div className={styles.titles}>
          <h2>LOBBY: {lobby.title}</h2>
          <h2>HOST: {lobby.host}</h2>
        </div>
        <h2 className={styles.seats}>{seatStatus}</h2>
      </div>
      <div className={styles.footer}>
        {full ? (
          <div className={`nes-container is-rounded ${styles.isError}`}>
            <span className="is-error">Full</span>
          </div>
        ) : (
          <span className={styles.empty}></span>
        )}
        <div className={styles.rightFooter}>
          <AvatarList avatars={avatars} />
          {full && mode === "Game" && (
            <Link to={`/games/${lobby.link}`}>
              <Button onClick={onClick} success>
                Spectate
              </Button>
            </Link>
          )}
          {!full && mode !== "Game" && (
            <Link to={`/games/${lobby.link}`}>
              <Button onClick={onClick} success>
                Join Game
              </Button>
            </Link>
          )}
          {full && mode !== "Game" && <span className={styles.empty}></span>}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
