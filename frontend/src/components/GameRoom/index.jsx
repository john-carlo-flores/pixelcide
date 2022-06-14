import Game from '../Game';
import Room  from './Room';
import Loading from './Loading';

import Navbar from '../Navbar';

import { useState, useEffect } from 'react';

import styles from "../../styles/GameRoom/GameRoom.module.scss";
import axios from 'axios';

const fakePlayers = {
  host: {
    name: 'Link',
    username: 'link',
    avatar_id: 1,
  },
  player2: {
    name: 'Zelda',
    username: 'zelda',
    avatar_id: 2
  },
  player3: {
    name: 'Ganon',
    username: 'ganon',
    avatar_id: 3
  }
};

const GameRoom = (props) => {
  const { user, userAuth, logout } = props;

  const [mode, setMode] = useState('Loading');
  const [players, setPlayers] = useState(); //Only gets added once they press Take Seat
  const [seats, setSeats] = useState({
    count: 1,
    playerSeated: {...fakePlayers}
  }); //Updates when host presses seat

  const startGame = () => {
    setMode('Loading');

    setTimeout(() => {
      setMode('Game');
    }, 10000);
  };

  const updateSeatCount = (update) => {
    switch (update) {
      case '+':
        setSeats(prev => {
          return {
            ...prev,
            count: prev.count + 1
          }
        });
        break;
      case '-':
        setSeats(prev => {
          return {
            ...prev,
            count: prev.count - 1
          }
        });
        break;
      default:
        break;
    }
  };

  const takeSeat = (player, seatNumber) => {
    setSeats(prev => {
      const newPlayerSeated = {
        ...prev.playerSeated,
      };

      newPlayerSeated[`player${seatNumber}`] = {
        name: player.name,
        username: player.username,
        avatar_id: player.avatar_id
      };

      return {
        ...prev,
        playerSeated: { ...newPlayerSeated }
      };
    });
  };

  useEffect(() => {
    //axios get request w/ listener to socket io to update players
    setTimeout(() => {
      //Switch from Loading state to created once finished
      setMode('Room');
    }, 5000);
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
      {mode === 'Room' && 
        <Room 
          user={user}
          handleStartGame={startGame} 
          seats={seats} 
          updateSeatCount={updateSeatCount}
          takeSeat={takeSeat}
        />
      }
      {mode === 'Loading' && <Loading />}
      {mode === 'Game' && <Game user={user} players={players}/>}
    </>
  );
};

export default GameRoom;
