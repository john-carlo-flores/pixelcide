import '../../styles/Game/PlayerAid.scss';

import { motion } from 'framer-motion';

import { useState } from 'react';

import { BsFillSuitClubFill } from 'react-icons/bs';
import { BsFillSuitSpadeFill } from 'react-icons/bs';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { BsFillDiamondFill } from 'react-icons/bs';

const PlayerAid = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleHover = () => {
    setTimeout(() => {
      setIsVisible((prev) => !prev);
    }, 1000);

    console.log(isVisible);
  };
  return (
    <div className="PlayerAid">
      <div className="PlayerAid-row">
        <div>
          <BsFillSuitClubFill size={35} color={'#309c63'} />
        </div>
        <div style={{ color: '#309c63' }}>Deal Double Damage</div>
      </div>

      <div className="PlayerAid-row">
        <div>
          <BsFillSuitSpadeFill size={35} color={'#8e478c'} />
        </div>
        <div style={{ color: '#8e478c' }}> Reduce Boss Attack</div>
      </div>

      <div className="PlayerAid-row">
        <div>
          <BsFillSuitHeartFill size={35} color={'#c93038'} />
        </div>
        <div style={{ color: '#c93038' }}>Heal From Discard</div>
      </div>

      <div className="PlayerAid-row">
        <div>
          <BsFillDiamondFill size={35} color={'#3978a8'} />
        </div>

        <div style={{ color: '#3978a8' }}>Draw Tavern Card</div>
      </div>
    </div>
  );
};

export default PlayerAid;
//render 4 suit icons
//hide drawer on mount

//
