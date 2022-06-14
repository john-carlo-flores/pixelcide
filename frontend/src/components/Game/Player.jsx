import Card from './Card';

const Player = (props) => {
  const { hand, playerName } = props;
  return (
    <div className="Player">
      <div className="player-cards">
        {hand.map((card) => (
          <Card key={card.id} image={card.image_front} />
        ))}
      </div>
      <div className="player-name">{playerName}</div>
    </div>
  );
};

export default Player;
