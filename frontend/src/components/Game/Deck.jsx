import Card from "../Game/Card";
import emptyCard from "../../assets/cards/placeholder.png";
import "../../styles/Game/Deck.scss";

const Deck = (props) => {
  const { deck, name, boss } = props;

  //waiting on the boss
  const bossCard = boss?.current;
  const bossStats = boss?.stats;

  const lastDiscardCard =
    deck.length > 0 && name === "discard" ? deck.at(-1) : {};
  const lastTavernCard =
    deck.length > 0 && name === "tavern" ? deck.at(-1) : {};

  return (
    <div className="Deck">
      {/* show card count */}
      <div className="count-badge">{deck.length}</div>

      {/* discard deck */}
      <div className="deckName">{name.toUpperCase()}</div>
      <div className={deck.length && "deck-main"}>
        {/* {name === 'discard' && !deck.length ? <Card image={emptyCard} /> : <Card image={lastDiscardCard.image_front} />} */}
        {name === "discard" && <Card image={lastDiscardCard.image_front} />}

        {/* castle deck */}
        {name === "castle" && <Card image={bossCard.image_front} />}

        {/* tavern deck */}
        {name === "tavern" && <Card image={lastTavernCard.image_back} />}
      </div>

      {/* show boss stats */}
      {name === "castle" && (
        <div className="nes-container with-title is-centered">
          <p className="title">Enemy status</p>
          <p className="boss-stats">Attack: {bossStats.damage}</p>
          <p className="boss-stats">Health: {bossStats.health}</p>
        </div>
      )}
    </div>
  );
};

export default Deck;
