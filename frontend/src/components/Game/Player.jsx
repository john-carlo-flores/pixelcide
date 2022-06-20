import useSound from "use-sound";
import Card from "./Card";
import "../../styles/Game/Player.scss";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import cardFlipSound from "../../assets/sounds/card-flip-.mp3";

const Player = (props) => {
  const { playerCards, playerName, avatar, setPlayerField, playerField, setPlayerCards, status, currentBoss } = props;
  const [playOn] = useSound(cardFlipSound);

  // function to check if the card can be played into the playing field ie correct combos
  const playable = (theCard) => {
    //if field empty all cards can be played
    if (playerField.length === 0) {
      return true;
    }
    //if any one card is in player field then only an Ace can be played (except Jester)
    if (playerField.length === 1 && playerField[0].tag === "A" && theCard.tag !== "Jester") {
      return true;
    }
    //if an ace in in player field any card can be played (except Jester)
    if (playerField.length === 1 && playerField[0].tag !== "Jester" && theCard.tag === "A") {
      return true;
    }
    //2 card combos (2-2, 3-3, 4-4, 5-5)
    if (
      playerField.length === 1 &&
      ((playerField[0].tag === "2" && theCard.tag === "2") ||
        (playerField[0].tag === "3" && theCard.tag === "3") ||
        (playerField[0].tag === "4" && theCard.tag === "4") ||
        (playerField[0].tag === "5" && theCard.tag === "5"))
    ) {
      return true;
    }
    //3 card combos (2-2-2, 3-3-3)
    if (
      playerField.length === 2 &&
      ((playerField[0].tag === "2" && playerField[1].tag === "2" && theCard.tag === "2") || (playerField[0].tag === "3" && playerField[1].tag === "3" && theCard.tag === "3"))
    ) {
      return true;
    }
    //4 card combo (2-2-2-2)
    if (playerField.length === 3 && playerField[0].tag === "2" && playerField[1].tag === "2" && playerField[2].tag === "2" && theCard.tag === "2") {
      return true;
    }
  };

  //click handler to move cards to player field
  const moveCardToPlayerField = (card) => {
    if (status === "boss_attack" || (status === "player_attack" && playable(card))) {
      const newPlayerCards = [...playerCards].filter((item) => item.id !== card.id);
      playOn();

      setPlayerCards(newPlayerCards);

      setTimeout(() => {
        setPlayerField((prev) => [...prev, card]);
      }, 400);
    }
  };

  //click handler to move cards back to player hand
  const moveCardToPlayerHand = (card) => {
    const newPlayerField = [...playerField].filter((item) => item.id !== card.id);

    setPlayerCards([...playerCards, card]);
    setPlayerField(newPlayerField);
  };

  return (
    <div className="Player">
      <LayoutGroup>
        <motion.div className="player-field">
          <AnimatePresence>
            {playerField.map((card) => (
              <motion.div
                layout
                transition={{ ease: "easeIn", duration: 0.5, opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => moveCardToPlayerHand(card)}
                key={card.id}
                className="player-field-card nes-pointer"
              >
                <Card image={card.image_front} warning={card.suit === currentBoss.suit && status !== "boss_attack" ? "warning" : ""} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <motion.div className="cards-container">
        <LayoutGroup>
          <AnimatePresence>
            {playerCards.map((card) => (
              <motion.div
                layout
                exit={{ y: -250, x: 0 }}
                transition={{ ease: "easeIn", duration: 0.4 }}
                whileHover={{
                  y: playable(card) && -20,
                  transition: { duration: 0.1 },
                  x: playable(card) && -40,
                }}
                key={card.id}
                onClick={() => moveCardToPlayerField(card)}
                className={(status === "player_attack" && playable(card)) || status === "boss_attack" ? "player-card highlight nes-pointer" : "player-card dull"}
              >
                <Card image={card.image_front} />
              </motion.div>
            ))}
          </AnimatePresence>
        </LayoutGroup>
      </motion.div>

      <div className="player-info">
        <img src={`https://raw.githubusercontent.com/tothenextcode/pixelcide/feature/frontend/Game-UI/frontend/src/assets/avatars/${avatar}.png`} alt="user avatar" />
        {playerName}
      </div>
    </div>
  );
};

export default Player;
