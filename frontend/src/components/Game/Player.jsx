import Card from "./Card";
import "../../styles/Game/Player.scss";

const Player = (props) => {
  const {
    playerCards,
    playerName,
    avatar,
    setPlayerField,
    playerField,
    setPlayerCards,
  } = props;

  const moveCardToPlayerField = (card) => {
    const newPlayerCards = [...playerCards].filter(
      (item) => item.id !== card.id
    );

    setPlayerCards(newPlayerCards);
    setPlayerField((prev) => [...prev, card]);
  };

  const moveCardToPlayerHand = (card) => {
    const newPlayerField = [...playerField].filter(
      (item) => item.id !== card.id
    );

    setPlayerCards([...playerCards, card]);
    setPlayerField(newPlayerField);
  };

  return (
    <div className="Player">
      <div className="player-field">
        {playerField.map((card) => (
          <div
            onClick={() => moveCardToPlayerHand(card)}
            key={card.id}
            className="player-field-card"
          >
            <Card image={card.image_front} />
          </div>
        ))}
      </div>

      <div className="cards-container">
        {playerCards.map((card) => (
          <div
            key={card.id}
            onClick={() => moveCardToPlayerField(card)}
            className="player-card"
          >
            <Card image={card.image_front} />
          </div>
        ))}
        {playerCards.length === 0 && <div className="empty"></div>}
      </div>

      <div className="player-info">
        <img
          src={`https://raw.githubusercontent.com/tothenextcode/pixelcide/feature/frontend/Game-UI/frontend/src/assets/avatars/${avatar}.png`}
          alt="user avatar"
        />
        {playerName}
      </div>
    </div>
  );
};

export default Player;
