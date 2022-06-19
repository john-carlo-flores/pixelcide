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
}

module.exports = { LobbyStore };
