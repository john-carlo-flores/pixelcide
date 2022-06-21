import "../../styles/Game/PlayedCards.scss";
import Card from "./Card";

import { motion, AnimatePresence } from "framer-motion";

const PlayedCards = (props) => {
  const { playedCards } = props;

  return (
    <motion.div className="PlayedCards">
      <AnimatePresence>
        {playedCards.map((card) => (
          <motion.div
            initial={{ opacity: 0, x: 900, y: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -800, x: 900 }}
            transition={{ duration: 0.4 }}
            key={card.id}
            className="player-card"
          >
            <Card image={card.image_front} name={card.card_name} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default PlayedCards;
