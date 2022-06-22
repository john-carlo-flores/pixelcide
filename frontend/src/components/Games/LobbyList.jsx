import Lobby from "./Lobby";

import styles from "../../styles/Games/LobbyList.module.scss";

const LobbyList = (props) => {
  const { lobbies, onClick } = props;

  const lobbyList = lobbies?.map((lobby) => {
    return (
      <Lobby
        key={lobby.link}
        lobby={lobby}
        seats={lobby.game.players}
        onClick={onClick}
      />
    );
  });

  return <div className={styles.container}>{lobbyList}</div>;
};

export default LobbyList;
