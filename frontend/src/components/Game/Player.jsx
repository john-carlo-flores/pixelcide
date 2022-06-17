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
    status,
  } = props;

  const playable = (theCard) => {
    if (playerField.length === 0) {
      return true;
    }
    if (
      playerField.length === 1 &&
      playerField[0].tag === "A" &&
      theCard.tag !== "Jester"
    ) {
      return true;
    }
    if (
      playerField.length === 1 &&
      playerField[0].tag !== "Jester" &&
      theCard.tag === "A"
    ) {
      return true;
    }
    if (
      playerField.length === 1 &&
      ((playerField[0].tag === "2" && theCard.tag === "2") ||
        (playerField[0].tag === "3" && theCard.tag === "3") ||
        (playerField[0].tag === "4" && theCard.tag === "4") ||
        (playerField[0].tag === "5" && theCard.tag === "5"))
    ) {
      return true;
    }
    if (
      playerField.length === 2 &&
      ((playerField[0].tag === "2" &&
        playerField[1].tag === "2" &&
        theCard.tag === "2") ||
        (playerField[0].tag === "3" &&
          playerField[1].tag === "3" &&
          theCard.tag === "3"))
    ) {
      return true;
    }
    if (
      playerField.length === 3 &&
      playerField[0].tag === "2" &&
      playerField[1].tag === "2" &&
      playerField[2].tag === "2" &&
      theCard.tag === "2"
    ) {
      return true;
    }
  };

  const moveCardToPlayerField = (card) => {
    if (
      status === "boss_attack" ||
      (status === "player_attack" && playable(card))
    ) {
      const newPlayerCards = [...playerCards].filter(
        (item) => item.id !== card.id
      );

      setPlayerCards(newPlayerCards);
      setPlayerField((prev) => [...prev, card]);
    }
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
