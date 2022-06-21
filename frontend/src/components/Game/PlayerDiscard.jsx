import Card from "./Card";

import { motion, LayoutGroup } from "framer-motion";

const PlayerDiscard = (props) => {
  const { playerDiscard, moveCardTo, status, bossSuit, playerTurn } = props;

  const onClick = (card) => {
    if (playerTurn) {
      moveCardTo(card, "Hand");
    }
  };

  const playerDiscardList = playerDiscard.map((card) => (
    <motion.div
      layout
      transition={{ ease: "easeIn", duration: 0.4, opacity: 0 }}
      onClick={() => onClick(card)}
      key={card.id}
      className="player-field-card nes-pointer"
    >
      <Card
        image={card.image_front}
        warning={
          card.suit === bossSuit && status !== "boss_attack" ? "warning" : ""
        }
      />
    </motion.div>
  ));

  return (
    <LayoutGroup>
      <motion.div className="player-field">{playerDiscardList}</motion.div>
    </LayoutGroup>
  );
};

export default PlayerDiscard;
