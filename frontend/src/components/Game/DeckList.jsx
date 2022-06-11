import Deck from './Deck';

const DeckList = ({ tavern, discard, castle }) => {
  return (
    <div className="DeckList">
      {<Deck deck={tavern} />}
      {<Deck deck={discard} />}
      {<Deck deck={castle} />}
    </div>
  );
};

export default DeckList;
