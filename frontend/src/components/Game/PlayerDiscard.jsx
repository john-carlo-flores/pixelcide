import Card from "./Card";

const PlayerDiscard = (props) => {
  const { playerDiscard, moveCardTo, status, bossSuit, playerTurn } = props;

  const onClick = (card) => {
    if (playerTurn) {
      moveCardTo(card, "Hand");
    }
  };

  const playerDiscardList = playerDiscard.map((card) => (
    <div onClick={() => onClick(card)} key={card.id} className="player-field-card nes-pointer">
      <Card image={card.image_front} warning={card.suit === bossSuit && status !== "boss_attack" ? "warning" : ""} />
    </div>
  ));

  return <div className="player-field">{playerDiscardList}</div>;
};

export default PlayerDiscard;
