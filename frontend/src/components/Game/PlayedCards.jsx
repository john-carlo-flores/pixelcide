import "../../styles/Game/PlayedCards.scss";
import Card from "./Card";

const PlayedCards = (props) => {
  const { playedCards } = props;

  return (
    <div className="PlayedCards">
      {playedCards.map((card) => (
        <div key={card.id} className="player-card">
          <Card image={card.image_front} name={card.card_name} />
        </div>
      ))}
    </div>
  );
};

export default PlayedCards;
