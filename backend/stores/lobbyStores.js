const { generateUniqueLink } = require('../helpers/authentication');

const MAX_NUM_ROOMS = 20;
const LINK_LENGTH = 8;

class LobbyStore {
  constructor() {
    this.lobbies = new Map();
  }

  createLobby() {
    if (this.lobbies.length === MAX_NUM_ROOMS) {
      return false;
    }

    // Get Link as unique identifier
    const link = generateUniqueLink(LINK_LENGTH);

    // Create lobby object
    const newLobby = {
      host: 'id',
      title: '',
      link,
      game: {}
    };

    // Add new lobby to store and return
    return this.lobbies.set(link, newLobby).get(link);
  };

  getLobby(link) {
    return this.lobbies.get(link);
  }

  cancelLobby(link) {
    this.lobbies.delete(link);
  };

  listLobbies() {
    console.log([...this.lobbies.values()]);
    return [...this.lobbies.values()];
  }

  updateLobby(lobby) {
    this.lobbies.set(lobby.link, lobby);
  }
}

module.exports = { LobbyStore };
