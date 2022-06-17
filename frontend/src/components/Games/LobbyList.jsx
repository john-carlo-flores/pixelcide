import Lobby from "./Lobby";

import styles from "../../styles/Games/LobbyList.module.scss";

const LobbyList = (props) => {  
  const { lobbies } = props;
  
  const lobbyList = lobbies?.map(lobby => {
    return (
      <Lobby
        lobby={lobby}
        seats={lobby.game.players}
      />
    )
  });

  return (
    <div className={styles.container}>
      {lobbyList}
    </div>
  );
};

export default LobbyList;