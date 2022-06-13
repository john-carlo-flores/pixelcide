import { Link } from 'react-router-dom';
import Game from '../Game';

const GameRoom = () => {
  return (
    <>
      <h1>This is the in-game lobby where users can join and wait for host to start.</h1>
      <Link to="/">Back to home page</Link>
      <Game />
    </>
  );
};

export default GameRoom;
