import Button from "../Button";
import SeatList from "./SeatList";
import { Link } from "react-router-dom";

import styles from "../../styles/GameRoom/Room.module.scss";

const Room = (props) => {
  const {
    user,
    handleSetupGame,
    seats,
    updateSeats,
    takeSeat,
    error,
    leaveRoom,
  } = props;

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
          <span className={"nes-container is-rounded nes-pointer"}>
            {error}
          </span>
        </div>
      )}
      <div className={styles.buttonContainer}>
        {user.host && (
          <Button onClick={handleSetupGame} success>
            Start Game
          </Button>
        )}
        <Link to="/games">
          <Button onClick={leaveRoom} warning>
            Leave Lobby
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Room;
