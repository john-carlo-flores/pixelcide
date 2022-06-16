import Card from './Card';
import '../../styles/Game/Player.scss';
import { useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const Player = (props) => {
  const { playerCards, playerName, avatar, setPlayerField, playerField, setPlayerCards } = props;

  const [moveCard, setMoveCard] = useState(false);

  const handleClick = (card) => {
    //removing that played card from player's hand
    const newPlayerCards = [...playerCards].filter((item) => item.id !== card.id);

    setPlayerCards(newPlayerCards);
    setPlayerField((prev) => [...prev, card]);

    // setMoveCard(!moveCard);
    console.log(playerCards);
  };

  return (
    <div className="Player">
      <div className="player-field">
        <AnimatePresence>
          {playerField.map((card) => (
            <motion.div exit={{ x: -1300 }} layout key={card.id} className="player-field-card">
              <Card image={card.image_front} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="cards-container">
        <AnimatePresence>
          {playerCards.map((card) => (
            <motion.div exit={{ y: -300, x: 150 }} transition={{ delay: 0 }} key={card.id} onClick={() => handleClick(card)} className="player-card">
              <Card image={card.image_front} />
            </motion.div>
          ))}
        </AnimatePresence>
        {playerCards.length === 0 && <div className="empty"></div>}
      </div>

      <div className="player-info">
        <img src={`https://raw.githubusercontent.com/tothenextcode/pixelcide/feature/frontend/Game-UI/frontend/src/assets/avatars/${avatar}.png`} alt="user avatar" />
        {playerName}
      </div>
    </div>
  );
};

export default Player;
