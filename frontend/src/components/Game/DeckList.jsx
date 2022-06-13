import Deck from './Deck';

const DeckList = (props) => {
  const { tavern, discard, castle, setCurrentBoss } = props;
  return (
    <div className="DeckList">
      {<Deck deck={tavern} name={'tavern'} />}
      {<Deck deck={discard} name={'discard'} />}
      {<Deck deck={castle} name={'castle'} setCurrentBoss={setCurrentBoss} />}
    </div>
  );
};

export default DeckList;
