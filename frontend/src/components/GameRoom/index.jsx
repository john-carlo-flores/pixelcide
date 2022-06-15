import Game from '../Game';
import Room from './Room';
import Loading from './Loading';

import Navbar from '../Navbar';

import { useState, useEffect } from 'react';

import styles from '../../styles/GameRoom/GameRoom.module.scss';

const fakePlayers = {
  host: {
    name: 'Link',
    username: 'link',
    avatar_id: 1,
    empty: false,
  },
  player2: {
    name: 'Zelda',
    username: 'zelda',
    avatar_id: 2,
    empty: false,
  },
  player3: {
    name: 'Ganon',
    username: 'ganon',
    avatar_id: 3,
    empty: false,
  },
  player4: null,
};

const GameRoom = (props) => {
  const { user, userAuth, logout } = props;

  const [mode, setMode] = useState('Loading');
  const [error, setError] = useState();
  const [players, setPlayers] = useState(); //Only gets added once they press Take Seat
  const [seats, setSeats] = useState({ ...fakePlayers }); //Updates when host presses seat

  const startGame = () => {
    // Check if created seat is not filled
    for (const seat of Object.keys(seats)) {
      if (seats[seat].empty) {
        return setError('All empty seats must be filled to start the game!');
      }
    }

    setError(null);
    setMode('Loading');

    setTimeout(() => {
      setMode('Game');
    }, 2000);
  };

  const updateSeatCount = (update, number = 0) => {
    switch (update) {
      case '+':
        setSeats((prev) => {
          const newSeats = { ...prev };
          newSeats[`player${number}`] = { empty: true };

          return newSeats;
        });
        break;

      case '-':
        setSeats((prev) => {
          const newSeats = { ...prev };
          delete newSeats[`player${number}`];

          return newSeats;
        });
        break;

      default:
        break;
    }
  };

  const takeSeat = (player, seatNumber) => {
    setSeats((prev) => {
      const newSeats = { ...prev };

      // Check if user already took a seat and switch locations
      const existingSeat = Object.keys(newSeats).find((seat) => newSeats[seat].username === player.username);

      if (existingSeat) {
        newSeats[existingSeat] = { empty: true };
      }

      newSeats[`player${seatNumber}`] = {
        name: player.name,
        username: player.username,
        avatar_id: player.avatar_id,
        empty: false,
      };

      return newSeats;
    });
  };

  useEffect(() => {
    //axios get request w/ listener to socket io to update players
    setTimeout(() => {
      //Switch from Loading state to created once finished
      setMode('Room');
    }, 2000);
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
      {mode === 'Room' && <Room user={user} handleStartGame={startGame} seats={seats} updateSeatCount={updateSeatCount} takeSeat={takeSeat} error={error} />}
      {mode === 'Loading' && <Loading />}
      {mode === 'Game' && <Game user={user} players={players} />}
    </>
  );
};

export default GameRoom;
