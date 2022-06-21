const PlayerSelect = (props) => {
  const { onSelect } = props;

  return (
    <div className="player-select" onClick={onSelect}>
      SELECT PLAYER
    </div>
  );
};

export default PlayerSelect;
