import '../../styles/Game/PlayerAid.scss';

import { useState, useEffect } from 'react';

import { BsFillSuitClubFill } from 'react-icons/bs';
import { BsFillSuitSpadeFill } from 'react-icons/bs';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { BsFillDiamondFill } from 'react-icons/bs';
import { GiJesterHat } from 'react-icons/gi';

const PlayerAid = ({ playerField, status, jester, currentBossStats }) => {
  const [toggleRow, setToggleRow] = useState([]);

  useEffect(() => {
    console.log(currentBossStats);
    if (status === 'player_attack') {
      const currentCards = [];
      for (const card of playerField) {
        currentCards.push(card.suit);
      }

      const triggerRow = (suit) => {
        setToggleRow([...toggleRow, suit]);
      };

      if (currentCards.at(-1) === 'Clubs' && currentBossStats.suit !== 'Clubs') {
        triggerRow('Clubs');
      }
      if (currentCards.at(-1) === 'Spades' && currentBossStats.suit !== 'Spades') {
        triggerRow('Spades');
      }
      if (currentCards.at(-1) === 'Diamonds' && currentBossStats.suit !== 'Diamonds') {
        triggerRow('Diamonds');
      }
      if (currentCards.at(-1) === 'Hearts' && currentBossStats.suit !== 'Hearts') {
        triggerRow('Hearts');
      }
      if (playerField.length < toggleRow.length) {
        const test = [...toggleRow];
        test.pop();
        setToggleRow(test);
      }
    } else if (status === 'boss_attack') {
      setToggleRow([]);
    }
  }, [playerField, status]);
  return (
    <div className="PlayerAid">
      <div className={toggleRow.includes('Clubs') ? 'PlayerAid-row open-row' : 'PlayerAid-row'}>
        <div>
          <BsFillSuitClubFill size={35} color={'#309c63'} />
        </div>
        <div style={{ color: '#309c63' }}>Deal Double Damage</div>
      </div>

      <div className={toggleRow.includes('Spades') ? 'PlayerAid-row open-row' : 'PlayerAid-row'}>
        <div>
          <BsFillSuitSpadeFill size={35} color={'#8e478c'} />
        </div>
        <div style={{ color: '#8e478c' }}> Reduce Boss Attack</div>
      </div>

      <div className={toggleRow.includes('Hearts') ? 'PlayerAid-row open-row' : 'PlayerAid-row'}>
        <div>
          <BsFillSuitHeartFill size={35} color={'#c93038'} />
        </div>
        <div style={{ color: '#c93038' }}>Heal Tavern Deck</div>
      </div>

      <div className={toggleRow.includes('Diamonds') ? 'PlayerAid-row open-row' : 'PlayerAid-row'}>
        <div>
          <BsFillDiamondFill size={35} color={'#3978a8'} />
        </div>
        <div style={{ color: '#3978a8' }}>Draw Tavern Card</div>
      </div>

      <div className={jester ? 'PlayerAid-row open-row' : 'PlayerAid-row'}>
        <div>
          <GiJesterHat size={35} color={'#c93038'} />
        </div>
        <div style={{ color: '#c93038' }}>Jester Activated</div>
      </div>
    </div>
  );
};

export default PlayerAid;
