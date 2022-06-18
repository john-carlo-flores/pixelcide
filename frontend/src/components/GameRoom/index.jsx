import Game from '../Game';
import Room from './Room';
import Loading from '../Loading';

import Navbar from '../Navbar';

import { useEffect, useContext } from 'react';
import useLobby from "../../hooks/useLobby";
import { useParams, useNavigate } from "react-router-dom";
import { SocketContext } from '../../context/socket';

import styles from '../../styles/GameRoom/GameRoom.module.scss';

const GameRoom = (props) => {
  const { user, userAuth, logout } = props;

  const { id } = useParams(); 
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const { 
    lobby, 
    takeSeat, 
    updateSeats, 
    startGame,
    updateLobby,
    mode,
    seats,
    game,
    error
  } = useLobby(socket);

  useEffect(() => {
    // Request lobby object based on url parameter
    socket.emit("Request Lobby", id);

    // Join room once link is established
    socket.emit("Join Room", id);

    // Listener for reply from lrequest lobby
    socket.on("Get Lobby", (lobby) => {
      // If none found, invalid room
      if (!lobby) {
        navigate("/"); // Return to home page
      }
      
      // Check and assign if user is host
      if (lobby?.host === user.username) {
        user.host = true;
      }

      // Set lobby based on recieved lobby from listener and update mode
      updateLobby(lobby, 'Room');
    });

    // Listens for all update lobby broadcasts
    socket.on("Update Lobby", (lobby) => {
      updateLobby(lobby);
    });

    // eslint-disable-next-line
  }, [socket]);

  return (
    <>
      {(mode === 'Room' || mode === 'Loading') && (
        <>
          <div className={styles.Homepage}></div>
          <Navbar userAuth={userAuth} user={user} logout={logout} />
        </>
      )}
      {mode === 'Room' && (
        <>
          <h1 className={styles.Title}>{`<${lobby.title}>`}</h1>
          <Room 
            user={user}
            handleStartGame={startGame}
            seats={seats}
            updateSeats={updateSeats}
            takeSeat={takeSeat}
            error={error} 
          />
        </>
      )}
      {mode === 'Loading' && <Loading />}
      {mode === 'Game' && <Game user={user} game={game}/>}
    </>
  );
};

export default GameRoom;
