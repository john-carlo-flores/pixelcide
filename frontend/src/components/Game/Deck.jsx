import Card from './Card';

const Deck = ({ deck }) => {
  return (
    <div className="Deck">
      {deck.map((card) => (
        <Card key={card.id} />
      ))}
    </div>
  );
};

export default Deck;
