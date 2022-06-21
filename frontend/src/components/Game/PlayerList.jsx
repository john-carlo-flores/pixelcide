import Player from "./Player";
import "../../styles/Game/PlayerList.scss";

const PlayerList = (props) => {
  const {
    players,
    user,
    moveCardTo,
    status,
    bossSuit,
    currentPlayer,
    handleCommands,
  } = props;

  const playerList = players.map((player) => {
    return (
      <div className="PlayerList">
        <Player
          key={player.id}
          player={player}
          status={status}
          bossSuit={bossSuit}
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
