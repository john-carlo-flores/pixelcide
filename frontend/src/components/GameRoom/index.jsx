import Game from '../Game';
import Room  from './Room';
import Loading from './Loading';

import Navbar from '../Navbar';

import { useState, useEffect } from 'react';

import styles from "../../styles/GameRoom/GameRoom.module.scss";

const GameRoom = (props) => {
  const [mode, setMode] = useState('Loading');
  const { user, userAuth, logout } = props;

  useEffect(() => {



  }, []);

  return (
    <>
      {(mode === 'Room' || mode === 'Loading') && (
        <>
          <div className={styles.Homepage}></div>
          <Navbar userAuth={userAuth} user={user} logout={logout} />
          <h1 className={styles.Title}>Pixelcide</h1>
        </>
      )}
      {mode === 'Room' && <Room />}
      {mode === 'Loading' && <Loading />}
      {mode === 'Game' && <Game user={user}/>}
    </>
  );
};

export default GameRoom;
