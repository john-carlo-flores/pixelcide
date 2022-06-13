import Card from '../Game/Card';

const Deck = ({ deck }) => {
  return (
    <div className="Deck">
      {deck.map((card) => (
        <Card id={card.id} name={card.card_name} key={card.id} image_front={card.image_front} image_back={card.image_back} />
      ))}
    </div>
  );
};

export default Deck;
