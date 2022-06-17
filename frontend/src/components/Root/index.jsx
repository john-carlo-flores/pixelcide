import Button from '../Button';
import Navbar from '../Navbar';
import LobbyCreation from './LobbyCreation';
import '../../styles/Root/Homepage.scss';

import useSound from 'use-sound';
import introMusic from '../../assets/sounds/intro-music.mp3';

import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SocketContext } from '../../context/socket';

export default function Homepage(props) {
  const { user, userAuth, logout } = props;
  const [createLobby, setCreateLobby] = useState({ create: false });
  const [lobby, setLobby] = useState();
  const socket = useContext(SocketContext);
  const [playActive] = useSound(introMusic, { volume: 0.25 });

  const hostGame = () => {
    const host = {
      id: user.id,
      username: user.username,
      name: user.name,
      avatar_id: user.avatar_id,
    };

    socket.emit('Create New Lobby', host);
  };

  const onCancel = () => {
    socket.emit('Cancel Lobby', lobby);
    setCreateLobby(false);
  };

  const assignLobbyTitle = (title) => {
    setLobby((prev) => {
      const updatedLobby = {
        ...prev,
        title,
      };

      // Send lobby title update to server
      socket.emit('Update Lobby', updatedLobby);
      return updatedLobby;
    });
  };

  useEffect(() => {
    // Add listener when new lobby is created if user is logged in
    if (user) {
      socket.on('Get Created Lobby', (createdLobby) => {
        if (!createdLobby) {
          return setCreateLobby({
            error: 'Reached maximum amount of rooms alloted. Please join existing games or try again later.',
          });
        }

        socket.emit('Join Room', createLobby.link);

        // Allow lobby creation and store lobby values
        setCreateLobby((prev) => {
          setLobby(createdLobby);
          return { create: true };
        });
      });
    }
  }, [user]);

  useEffect(() => {
    playActive();
  }, [user]);

  return (
    <>
      <div className="Homepage"></div>
      <Navbar userAuth={userAuth} user={user} logout={logout} />
      <div className="Menu">
        <h1 className="Title">Pixelcide</h1>
        <div className="Buttons">
          {props.user && (
            <>
              <Button onClick={hostGame} error>
                Host Game
              </Button>
              <Link to="games">
                <Button error>Join Game</Button>
              </Link>
              <Link to="statistics">
                <Button error>Statistics</Button>
              </Link>
              <Link to="leaderboard">
                <Button error>Leaderboard</Button>
              </Link>
            </>
          )}
          {!props.user && (
            <Link to="signup">
              <Button error>Sign Up</Button>
            </Link>
          )}
        </div>
      </div>
      {createLobby.create && <LobbyCreation onCancel={onCancel} assignTitle={assignLobbyTitle} link={lobby.link} />}
      {createLobby.error && <p>{createLobby.error}</p>}
    </>
  );
}
