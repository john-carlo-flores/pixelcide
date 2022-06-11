import Player from './Player';

const PlayerList = ({ players, currentPlayer }) => {
  return (
    <div className="PlayerList">
      {players.map((player) => (
        <Player key={player.id} player={player} currentPlayer={currentPlayer} />
      ))}
    </div>
  );
};

export default PlayerList;
