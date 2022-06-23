const { generateUniqueLink } = require("../helpers/authentication");

const MAX_NUM_ROOMS = 20;
const LINK_LENGTH = 8;

class LobbyStore {
  constructor() {
    this.lobbies = new Map();
  }

  createLobby(host) {
    if (this.lobbies.length === MAX_NUM_ROOMS) {
      return false;
    }

    // Get Link as unique identifier
    const link = generateUniqueLink(LINK_LENGTH);

    // Create lobby object
    const newLobby = {
      host: host.username,
      title: "",
      link,
      game: {
        players: ["none", "none", "none", "none"],
      },
    };

    // store new lobby and return
    this.addUserToLobby(newLobby, 0, host);
    return this.lobbies.set(link, newLobby).get(link);
  }

  getLobby(link) {
    return this.lobbies.get(link);
  }

  cancelLobby(lobby) {
    this.lobbies.delete(lobby.link);
  }

  listLobbies() {
    console.log([...this.lobbies.values()]);
    return [...this.lobbies.values()];
  }

  updateLobby(lobby) {
    const prevLobby = this.lobbies.get(lobby.link);

    const updatedLobby = {
      ...prevLobby,
      ...lobby,
    };

    // Store updated lobby and return
    this.lobbies.set(lobby.link, updatedLobby);
    return updatedLobby;
  }

  addUserToLobby(lobby, seat, user) {
    lobby.game.players[seat] = user;
  }

  /*-------------- GAME --------------*/
  updateGame(link, key, data) {
    const updatedLobby = this.lobbies.get(link);
    updatedLobby.game[key] = data;

    if (data === "player_turn") {
      updatedLobby.number_of_moves++;
    }

    // Store updated lobby and return
    this.lobbies.set(link, updatedLobby);
    return updatedLobby;
  }

  startGameTimer(link) {
    const startTime = new Date().toISOString();
    this.updateLobby({ startTime, number_of_moves: 0, link });
  }

  endGameTimerAndPost(link, status, id = null) {
    // Set end time
    const endTime = new Date().toISOString();
    this.updateLobby({ endTime, link });

    // Get lobby and setup users
    const latestLobby = this.lobbies.get(link);
    if (!latestLobby) return null;

    const users = latestLobby.game.players.map((player) => player.id);

    // Return Post Data
    return {
      status,
      number_of_moves: latestLobby.number_of_moves,
      started_at: latestLobby.startTime,
      finished_at: latestLobby.endTime,
      users: id || users,
    };
  }
}

module.exports = { LobbyStore };
