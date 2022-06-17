import Card from './Card';
import '../../styles/Game/Player.scss';
import { motion, AnimatePresence } from 'framer-motion';

const Player = (props) => {
  const { playerCards, playerName, avatar, setPlayerField, playerField, setPlayerCards } = props;

  const handleClick = (card) => {
    //removing that played card from player's hand
    const newPlayerCards = [...playerCards].filter((item) => item.id !== card.id);

    setPlayerCards(newPlayerCards);

    setTimeout(() => {
      setPlayerField((prev) => [...prev, card]);
    }, 200);
  };

  return (
    <div className="Player">
      <motion.div initial={false} className="player-field">
        {playerField.map((card) => (
          <motion.div layout key={card.id} className="player-field-card">
            <Card image={card.image_front} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="cards-container">
        <AnimatePresence>
          {playerCards.map((card) => (
            <motion.div exit={{ y: -250, x: 0 }} transition={{ ease: 'easeIn' }} key={card.id} onClick={() => handleClick(card)} className="player-card">
              <Card image={card.image_front} />
            </motion.div>
          ))}
        </AnimatePresence>

        {playerCards.length === 0 && <div className="empty"></div>}
      </motion.div>

      <div className="player-info">
        <img src={`https://raw.githubusercontent.com/tothenextcode/pixelcide/feature/frontend/Game-UI/frontend/src/assets/avatars/${avatar}.png`} alt="user avatar" />
        {playerName}
      </div>
    </div>
  );
};

export default Player;
