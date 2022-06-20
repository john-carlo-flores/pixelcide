import Card from "../Game/Card";
import "../../styles/Game/Deck.scss";

const Deck = (props) => {
  const { deck, name, currentBoss, jester } = props;

  //waiting on the boss
  const theBoss = currentBoss || {};

  const lastDiscardCard = deck.length > 0 && name === "discard" ? deck.at(-1) : {};
  const lastTavernCard = deck.length > 0 && name === "tavern" ? deck.at(-1) : {};

  const colors = {
    Clubs: "#309c63",
    Hearts: "#c93038",
    Spades: "#8e478c",
    Diamonds: "#3978a8",
  };

  console.log(theBoss);

  return (
    <div className="Deck">
      {/* show card count */}
      <div className="count-badge">{deck.length}</div>

      {/* discard deck */}
      <div className="deckName">{name.toUpperCase()}</div>
      <div className={deck.length && "deck-main"}>
        {!deck.length && <div className="empty-card"></div>}
        {name === "discard" && <Card image={lastDiscardCard.image_front} />}

        {/* castle deck */}
        {name === "castle" && <Card image={theBoss.image_front} />}

        {/* tavern deck */}
        {name === "tavern" && <Card image={lastTavernCard.image_back} />}
      </div>

      {/* show boss stats */}
      {name === "castle" && (
        <div
          className={!jester ? "nes-container with-title is-centered" : "nes-container with-title is-centered funky"}
          style={{ borderColor: `${!jester && colors[theBoss.suit]}` }}
        >
          <p className={!jester ? "title" : "title more-funky"} style={{ backgroundColor: `${colors[theBoss.suit]}` }}>
            Enemy status
          </p>
          <p className="boss-stats">Attack: {theBoss.damage}</p>
          <p className="boss-stats">Health: {theBoss.health}</p>
        </div>
      )}
    </div>
  );
};

export default Deck;
