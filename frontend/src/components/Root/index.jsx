import Button from "../Button";
import Navbar from "../Navbar";
import LobbyCreation from "./LobbyCreation";
import "../../styles/Root/Homepage.scss";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Homepage(props) {
  const { user, userAuth, logout } = props;
  const [ createLobby, setCreateLobby ] = useState({ create: false });
  const [ lobby, setLobby ] = useState();
  
  const hostGame = () => {
    user.socket.emit("Create New Lobby");
  };

  const onCancel = () => {
    user.socket.emit("Cancel Lobby", lobby);
    setCreateLobby(false);
  };

  const assignLobbyTitle = (title) => {
    console.log(`Assign Lobby with ${title}`);
    setLobby(prev => {
      const updatedLobby = {
        ...prev,
        title
      };

      user.socket.emit("Update Lobby", updatedLobby);

      return updatedLobby;
    });
  };

  useEffect(() => {
    // Add listener when new lobby is created if user is logged in
    user?.socket.on("Get Created Lobby", (createdLobby) => {
      if (!createdLobby) {
        return setCreateLobby({
          error: "Reached maximum amount of rooms alloted. Please join existing games or try again later."
        });
      }

      // Allow lobby creation and store lobby values
      setCreateLobby(prev => {
        setLobby(createdLobby);
        return { create: true }
      });
      
    });
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
              <Button onClick={hostGame} error>Host Game</Button>
              <Link to="games"><Button error>Join Game</Button></Link>
              <Link to="statistics"><Button error>Statistics</Button></Link>
              <Link to="leaderboard"><Button error>Leaderboard</Button></Link>
            </>
          )}
          {!props.user && <Link to="signup"><Button error>Sign Up</Button></Link>}
        </div>
      </div>
      {createLobby.create && <LobbyCreation onCancel={onCancel} assignTitle={assignLobbyTitle} link={lobby.link}/>}
      {createLobby.error && <p>{createLobby.error}</p>}
    </>
  );
}
