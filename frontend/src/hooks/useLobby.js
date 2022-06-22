import { useState } from "react";
import _ from "lodash";

const useLobby = (socket) => {
  const [lobby, setLobby] = useState({
    mode: "Loading",
    error: null,
    game: {
      players: [{}, "none", "none", "none"],
    },
  });

  const publishChanges = (lobby) => {
    socket.emit("Update Lobby", lobby);
  };

  const updateLobby = (data, send = true) => {
    setLobby((prev) => {
      const updatedLobby = {
        ...prev,
        ...data,
      };

      if (send) publishChanges(updatedLobby);

      return updatedLobby;
    });
  };

  const allSeatsFilled = () => {
    for (const seat of lobby.game.players) {
      if (seat.empty) {
        updateLobby(
          {
            error: "All empty seats must be filled to start the game!",
          },
          false
        );

        return false;
      }
    }

    return true;
  };

  const hostGame = (user) => {
    const host = {
      id: user.id,
      username: user.username,
      name: user.name,
      avatar_id: user.avatar_id,
    };

    socket.emit("Create New Lobby", host);
  };

  const setupGame = () => {
    // Make sure all seats set are filled
    if (allSeatsFilled()) {
      // Filter players and remove empty seats
      const gameCopy = _.cloneDeep(lobby.game);
      gameCopy.players = gameCopy.players.filter((player) => player !== "none");

      // Clear error and start game
      updateLobby({
        error: null,
        mode: "Setup",
        game: gameCopy,
      });
    }
  };

  const startGame = (game) => {
    updateLobby({
      mode: "Game",
      game,
    });
  };

  const updateGame = (game) => {
    updateLobby({ game });
  };

  const assignLobbyTitle = (title) => {
    updateLobby({
      title,
    });
  };

  const updateLocalLobby = (lobby, newMode = false) => {
    const data = {
      ...lobby,
    };

    if (newMode) {
      data.mode = newMode;
    }

    updateLobby(data, false);
  };

  const cancelLobby = () => {
    socket.emit("Cancel Lobby", lobby);
    setLobby({});
  };

  // Either removes or adds a seat based on update parameter
  const updateSeats = (update, seat) => {
    switch (update) {
      //Add new seat with empty: true
      case "+":
        setLobby((prev) => {
          const updatedLobby = { ...prev, localChange: true };
          updatedLobby.game.players[seat] = { empty: true };
          publishChanges(updatedLobby);

          return updatedLobby;
        });
        break;

      // Remove seat based on number location
      case "-":
        setLobby((prev) => {
          const updatedLobby = { ...prev, localChange: true };
          updatedLobby.game.players[seat] = "none";
          publishChanges(updatedLobby);

          return updatedLobby;
        });
        break;

      default:
        break;
    }
  };

  const takeSeat = (player, seat) => {
    setLobby((prev) => {
      const updatedLobby = { ...prev, localChange: true };
      const seats = updatedLobby.game.players;

      // Check if existing user previously had a seat
      const existingSeat = seats.findIndex(
        (seat) => seat.username === player.username
      );

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

      publishChanges(updatedLobby);

      return updatedLobby;
    });
  };

  return {
    lobby,
    takeSeat,
    updateSeats,
    hostGame,
    setupGame,
    startGame,
    updateGame,
    setLobby,
    cancelLobby,
    assignLobbyTitle,
    updateLocalLobby,
    mode: lobby.mode,
    seats: lobby?.game?.players,
    game: lobby.game,
    error: lobby.error,
  };
};

export default useLobby;
