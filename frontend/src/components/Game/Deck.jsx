import Card from "../Game/Card";
import "../../styles/Game/Deck.scss";

import classNames from "classnames";

const Deck = (props) => {
  const { deck, name, boss } = props;

  // Declare boss sub components
  const bossCard = boss?.current;
  const bossStats = boss?.stats;
  const bossPreview = boss?.preview;
  const jesterActive = bossStats?.powerEnabled;

  // Get top cards of each deck to render front
  const lastDiscardCard =
    deck.length > 0 && name === "discard" ? deck.at(-1) : {};
  const lastTavernCard =
    deck.length > 0 && name === "tavern" ? deck.at(-1) : {};

  // Declare classNames
  const container = classNames(
    `nes-container with-title is-centered ${bossStats?.suit}-border`,
    { funky: jesterActive }
  );
  const containerTitle = classNames(`title ${bossStats?.suit}-background`, {
    "more-funky": jesterActive,
  });

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
        {name === "castle" && <Card image={bossCard.image_front} />}

        {/* tavern deck */}
        {name === "tavern" && <Card image={lastTavernCard.image_back} />}
      </div>

      {/* show boss stats */}
      {name === "castle" && (
        <div className={container}>
          <p className={containerTitle}>Enemy status</p>
          {bossPreview.damage && bossPreview.damage !== bossStats.damage ? (
            <p className="boss-stats">
              Attack: <span className="preview">{bossPreview.damage}</span>
            </p>
          ) : (
            <p className="boss-stats">Attack: {bossStats.damage}</p>
          )}
          {bossPreview.health && bossPreview.health !== bossStats.health ? (
            <p className="boss-stats">
              Health: <span className="preview">{bossPreview.health}</span>
            </p>
          ) : (
            <p className="boss-stats">Health: {bossStats.health}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Deck;
