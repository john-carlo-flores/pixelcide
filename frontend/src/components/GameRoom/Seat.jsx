import Empty from './Empty';
import Button from '../Button';

import classNames from 'classnames';

import styles from '../../styles/GameRoom/Seat.module.scss';

const Seat = (props) => {
  const { user, number, playerSeated, takeSeat, updateSeatCount } = props;
  const host = number === 1;
  user.host = true;

  const addSeat = () => {
    updateSeatCount('+', number);
  };

  const removeSeat = () => {
    updateSeatCount('-', number);
  };

  const occupySeat = () => {
    takeSeat(user, number);
  };
 
  return (
    <div className={styles.main}>
      {playerSeated ? (
        <div className={`${styles.container} nes-container is-rounded`}>
          <div className={styles.header}>
            <h2>{!host ? 'Player:' : 'Host:'}</h2>
            {(!host && user.host) && <Button onClick={removeSeat} error>X</Button>}
          </div>
          <h2 className={styles.tag}>{playerSeated?.username || '<empty>' }</h2>
          {(!host && playerSeated.empty) ? (
            <div className={styles.btn}>
              <Button onClick={occupySeat}>Take Seat</Button>
            </div>
          ) : (
          <div className={styles.footer}>
            {!playerSeated.empty && <img src={`https://raw.githubusercontent.com/tothenextcode/pixelcide/feature/frontend/Game-UI/frontend/src/assets/avatars/${playerSeated.avatar_id}.png`} alt="Avatar"/>}
          </div>)}
        </div>
      ) : (
        <div className={styles.empty}>
          <Empty onClick={addSeat}/>
        </div>
      )}
    </div>
  );
};

export default Seat;