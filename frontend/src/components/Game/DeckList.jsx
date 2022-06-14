import Deck from './Deck';
import '../../styles/DeckList.scss';

const DeckList = (props) => {
  const { tavern, discard, castle, setCurrentBoss } = props;
  return (
    <div className="DeckList">
      {<Deck deck={discard} name={'discard'} />}
      {<Deck deck={castle} name={'castle'} setCurrentBoss={setCurrentBoss} />}
      {<Deck deck={tavern} name={'tavern'} />}
    </div>
  );
};

export default DeckList;
