import Card from './Card';
import '../../styles/Game/Player.scss';

const Player = (props) => {
  const { playerCards, playerName, avatar, setPlayerField, playerField, setPlayerCards } = props;

  const handleClick = (card) => {
    //removing that played card from player's hand
    const newPlayerCards = [...playerCards].filter((item) => item.id !== card.id);
    setPlayerCards((prev) => {
      return newPlayerCards;
    });

    setPlayerField((prev) => {
      return [...prev, card];
    });
  };

  return (
    <div className="Player">
      <div className="player-field">
        {playerField.map((card) => (
          <div className="player-field-card">
            <Card key={card.id} image={card.image_front} />
          </div>
        ))}
      </div>

      <div className="cards-container">
        {playerCards.map((card) => (
          <div key={card.id} onClick={() => handleClick(card)} className="player-card">
            <Card image={card.image_front} />
          </div>
        ))}
        {playerCards.length === 0 && <div className="empty"></div>}
      </div>

      <div className="player-info">
        <img src={`https://raw.githubusercontent.com/tothenextcode/pixelcide/feature/frontend/Game-UI/frontend/src/assets/avatars/${avatar}.png`} alt="user avatar" />
        {playerName}
      </div>
    </div>
  );
};

export default Player;
