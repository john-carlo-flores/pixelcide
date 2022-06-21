import Player from "./Player";
import "../../styles/Game/PlayerList.scss";

const PlayerList = (props) => {
  const { players, user, moveCardTo, status, bossSuit, currentPlayer } = props;

  const playerList = players.map((player) => {
    return (
      <div className="PlayerList">
        <Player
          key={player.id}
          playerField={player.field}
          playerHand={player.hand}
          playerDiscard={player.discard}
          playedCards={player.played}
          playerName={player.username}
          avatar={user.avatar_id}
          status={status}
          bossSuit={bossSuit}
          moveCardTo={moveCardTo}
          owner={user.id === player.id}
          playerTurn={currentPlayer.id === player.id}
        />
      </div>
    );
  });

  return <div className="PlayerList">{playerList}</div>;
};

export default PlayerList;
