import '../../styles/Game/Card.scss';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const Card = (props) => {
  const { image, id, card_name } = props;

  return (
    <motion.div>
      <img className="Card" src={image} alt={card_name} />
    </motion.div>
  );
};

export default Card;
