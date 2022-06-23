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

  const leaveSeat = (player) => {
    const game = _.cloneDeep(lobby.game);

    // Check if existing user previously had a seat
    const existingSeat = game.players.findIndex(
      (seat) => seat.username === player.username
    );

    // Empty out old seat
    if (existingSeat > -1) {
      game.players[existingSeat] = { empty: true };
    }

    updateLobby({ game });
  };

  // Either removes or adds a seat based on update parameter
  const updateSeats = (update, seat) => {
    let game = null;

    switch (update) {
      //Add new seat with empty: true
      case "+":
        game = _.cloneDeep(lobby.game);
        game.players[seat] = { empty: true };
        updateLobby({ game });
        break;

      // Remove seat based on number location
      case "-":
        game = _.cloneDeep(lobby.game);
        game.players[seat] = "none";
        updateLobby({ game });
        break;

      default:
        break;
    }
  };

  const takeSeat = (player, seat) => {
    const game = _.cloneDeep(lobby.game);

    // Check if existing user previously had a seat
    const existingSeat = game.players.findIndex(
      (seat) => seat.username === player.username
    );

    // Empty out old seat
    if (existingSeat > -1) {
      game.players[existingSeat] = { empty: true };
    }

    // Fill new empty seat
    game.players[seat] = {
      id: player.id,
      name: player.name,
      username: player.username,
      avatar_id: player.avatar_id,
      empty: false,
    };

    updateLobby({ game });
  };

  return {
    lobby,
    takeSeat,
    updateSeats,
    leaveSeat,
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
