import { useEffect } from 'react';
import Card from '../Game/Card';
import emptyCard from '../../assets/cards/placeholder.png';
import '../../styles/Deck.scss';

const Deck = (props) => {
  const { deck, name, setCurrentBoss } = props;

  const lastDiscardCard = deck.length > 0 && name === 'discard' ? deck.at(-1) : {};
  const lastCastleCard = deck.length > 0 && name === 'castle' ? deck.at(-1) : {};
  const lastTavernCard = deck.length > 0 && name === 'tavern' ? deck.at(-1) : {};

  useEffect(() => {
    name === 'castle' && setCurrentBoss(lastCastleCard);
  }, [lastCastleCard]);

  return (
    <div className="Deck">
      {/* discard deck */}
      <div className="deckName">{name.toUpperCase()}</div>

      <div className="deck-main">
        {name === 'discard' && !deck.length ? <Card image={emptyCard} /> : <Card image={lastDiscardCard.image_front} />}

        {/* castle deck */}
        {name === 'castle' && <Card image={lastCastleCard.image_front} />}

        {/* tavern deck */}
        {name === 'tavern' && <Card image={lastTavernCard.image_back} />}
      </div>
    </div>
  );
};

export default Deck;
