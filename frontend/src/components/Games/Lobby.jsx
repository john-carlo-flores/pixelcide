import Button from "../Button";
import Avatar from "./Avatar";

import styles from "../../styles/Games/Lobby.module.scss";

const Lobby = (props) => {
  const { lobby, seats } = props;

  const seatCount = "1/4";
  const full = false;

  const avatarList = [];

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.titles}>
          <h2>LOBBY: {lobby.title}</h2>
          <h2>HOST: {lobby.host}</h2>
        </div>
        <h2 className={styles.seats}>{seatCount}</h2>
      </div>
      <div className={styles.footer}>
        {full ? (
          <Button error></Button>
        ) : (
          <span className={styles.empty}></span>
        )}
        <span className={styles.avatars}>
          {avatarList}
        </span>
        {full ? (
          <Button error>Spectate</Button>
        ) : (
          <Button success>Join Game</Button>
        )}
      </div>

    </div>
  );
};

export default Lobby;