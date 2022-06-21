import Button from "../Button";

const PlayerSelect = (props) => {
  const { onSelect, playerTurn } = props;

  return (
    <div className="player-select">
      {!playerTurn && (
        <Button onClick={onSelect} success>
          SELECT PLAYER
        </Button>
      )}
    </div>
  );
};

export default PlayerSelect;
