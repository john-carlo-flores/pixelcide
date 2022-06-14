import Card from './Card';
import '../../styles/Game/Player.scss';

const Player = (props) => {
  const { hand, playerName, avatar } = props;

  return (
    <div className="Player">
      <div className="cards-container">
        {hand.map((card) => (
          <div key={card.id} className="player-card">
            <Card image={card.image_front} />
          </div>
        ))}
      </div>

      <div className="player-info">
        <img src={`https://raw.githubusercontent.com/tothenextcode/pixelcide/feature/frontend/Game-UI/frontend/src/assets/avatars/${avatar}.png`} alt="user avatar" />
        {playerName}
      </div>
    </div>
  );
};

export default Player;
