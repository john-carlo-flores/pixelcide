import { useState, useEffect } from "react";

const useLobby = (socket) => {
  const [ lobby, setLobby ] = useState({
    mode: 'Loading',
    error: null,
    game: {
      players: [{}, 'none',  'none', 'none']
    }
  });

  useEffect(() => {
    // If lobby is changed locally, broadcast to other users
    if (lobby.link && lobby?.localChange) {
      socket.emit("Update Lobby", lobby);
    }
  }, [lobby]);

  const allSeatsFilled = () => {
    for (const seat of lobby.game.players) {
      if (seat.empty) {
        setLobby(prev => {
          return {
            ...prev,
            error: 'All empty seats must be filled to start the game!',
            localChange: true
          }
        });

        return false;
      }
    }

    return true;
  };

  const startGame = () => {
    // Make sure all seats set are filled
    if (allSeatsFilled()) {
      // Clear error and set to Loading
      setLobby(prev => {
        return {
          ...prev,
          error: null,
          mode: 'Loading',
          localChange: true
        }
      });
      
      // Timeout for 2 secs before game starts
      setTimeout(() => {
        setLobby(prev => {
          return {
            ...prev,
            mode: 'Game',
            localChange: true
          }
        });
      }, 2000);
    };
  };

  const updateLobby = (lobby, newMode = false) => {
    setLobby(prev => {
      return {
        ...lobby,
        mode: newMode || prev.mode,
        localChange: false
      }
    });
  };

  // Either removes or adds a seat based on update parameter
  const updateSeats = (update, seat) => {
    switch (update) {
      //Add new seat with empty: true
      case '+':
        setLobby(prev => {
          const updatedLobby = { ...prev, localChange: true }
          updatedLobby.game.players[seat] = { empty: true };

          return updatedLobby;
        });
        break;
      
        // Remove seat based on number location
      case '-':
        setLobby(prev => {
          const updatedLobby = { ...prev, localChange: true };
          updatedLobby.game.players[seat] = 'none';

          return updatedLobby;
        });
        break;

      default:
        break;
    }
  };

  const takeSeat = (player, seat) => {
    setLobby(prev => {
      const updatedLobby = { ...prev, localChange: true };
      const seats = updatedLobby.game.players;

      // Check if existing user previously had a seat
      const existingSeat = seats.findIndex(seat => seat.username === player.username);

      // Empty out old seat
      if (existingSeat > -1) {
        seats[existingSeat] = { empty: true };
      }

      // Fill new empty seat
      seats[seat] = {
        id: player.id,
        name: player.name,
        username: player.username,
        avatar_id: player.avatar_id,
        empty: false,
      };

      return updatedLobby;
    });
  };

  return { 
    lobby, 
    takeSeat, 
    updateSeats, 
    startGame,
    updateLobby,
    mode: lobby.mode,
    seats: lobby.game.players,
    game: lobby.game,
    error: lobby.error
  };
};

export default useLobby;