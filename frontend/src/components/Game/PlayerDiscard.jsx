import Card from "./Card";

const PlayerDiscard = (props) => {
  const { playerDiscard, moveCardTo, status, bossSuit, playerTurn, owner } =
    props;

  const onClick = (card) => {
    if (playerTurn) {
      moveCardTo(card, "Hand");
    }
  };

  const playerDiscardList = playerDiscard.map((card) => (
    <div
      onClick={() => onClick(card)}
      key={card.id}
      className="player-field-card nes-pointer"
    >
      <Card
        image={owner ? card.image_front : card.image_back}
        warning={
          card.suit === bossSuit && owner && status !== "boss_attack"
            ? "warning"
            : ""
        }
      />
    </div>
  ));

  return <div className="player-field">{playerDiscardList}</div>;
};

export default PlayerDiscard;
