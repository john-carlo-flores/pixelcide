import Card from './Card';
import '../../styles/Player.scss';

const Player = (props) => {
  const { hand, playerName } = props;
  return (
    <div className="Player">
      <div className="cards-container">
        {hand.map((card) => (
          <div key={card.id} className="player-card">
            <Card image={card.image_front} />
          </div>
        ))}
      </div>

      <div className="player-name">{playerName}</div>
    </div>
  );
};

export default Player;
