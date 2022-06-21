import Player from "./Player";
import "../../styles/Game/PlayerList.scss";

const PlayerList = (props) => {
  const {
    players,
    user,
    moveCardTo,
    status,
    boss,
    currentPlayer,
    handleCommands,
  } = props;

  const playerList = players.map((player, index) => {
    return (
      <div className="PlayerList">
        <Player
          key={player.id}
          index={index}
          player={player}
          status={status}
          bossSuit={boss.stats?.suit}
          jesterActive={boss.stats?.powerDisabled}
          moveCardTo={moveCardTo}
          owner={user.id === player.id}
          playerTurn={currentPlayer.id === player.id}
          handleCommands={handleCommands}
        />
      </div>
    );
  });

  return <div className="PlayerList">{playerList}</div>;
};

export default PlayerList;
