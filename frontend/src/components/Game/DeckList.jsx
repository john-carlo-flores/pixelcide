import Deck from "./Deck";
import "../../styles/Game/DeckList.scss";

const DeckList = (props) => {
  const { tavern, discard, castle, boss } = props;
  return (
    <div className="DeckList">
      {<Deck deck={discard} name={"discard"} />}
      {<Deck deck={castle} name={"castle"} boss={boss} />}
      {<Deck deck={tavern} name={"tavern"} />}
    </div>
  );
};

export default DeckList;
