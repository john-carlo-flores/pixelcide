import Player from "./Player";

const PlayerList = (props) => {
  const { players, user, moveCardTo, status, bossSuit } = props;

  const playerList = players.map((player) => {
    return (
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
      />
    );
  });

  return <div className="PlayerList">{playerList}</div>;
};

export default PlayerList;
