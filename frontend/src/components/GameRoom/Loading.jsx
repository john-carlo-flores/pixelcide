import loading from '../../assets/loading/card-spinner.gif';

import styles from '../../styles/GameRoom/Loading.module.scss';

import { useEffect, useState } from 'react';

const Loading = () => {
  const [dots, setDots] = useState('Loading Game');

  const cycleDots = () => {
    setDots(prev => {
      if (prev.length < 15) {
        return `${prev}.`;
      }

      return 'Loading Game';
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      cycleDots();
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.loading}>
      <img className={styles.img} src={loading} alt='Loading'/>
      <span className={styles.loadingText}>{dots}</span>
    </div>
  );
};

export default Loading;

