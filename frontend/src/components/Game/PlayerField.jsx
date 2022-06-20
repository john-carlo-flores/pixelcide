import Card from "./Card";

import { motion, LayoutGroup } from "framer-motion";

const PlayerField = (props) => {
  const { playerField, moveCardTo, status, bossSuit } = props;

  const playerFieldList = playerField.map((card) => (
    <motion.div
      layout
      transition={{ ease: "easeIn", duration: 0.4, opacity: 0 }}
      onClick={() => moveCardTo(card, "Hand")}
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
      <motion.div className="player-field">{playerFieldList}</motion.div>
    </LayoutGroup>
  );
};

export default PlayerField;
