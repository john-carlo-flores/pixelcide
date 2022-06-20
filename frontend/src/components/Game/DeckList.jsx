import Deck from "./Deck";
import "../../styles/Game/DeckList.scss";

const DeckList = (props) => {
  const { tavern, discard, castle, currentBoss, jester } = props;
  return (
    <div className="DeckList">
      {<Deck deck={discard} name={"discard"} />}
      {<Deck deck={castle} name={"castle"} currentBoss={currentBoss} jester={jester} />}
      {<Deck deck={tavern} name={"tavern"} />}
    </div>
  );
};

export default DeckList;
