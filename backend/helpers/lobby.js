const { generateUniqueLink } = require('../helpers/authentication');

const MAX_NUM_ROOMS = 20;
const LINK_LENGTH = 8;

let lobbies = [];

const createLobby = (id) => {
  if (lobbies.length === MAX_NUM_ROOMS) {
    return false;
  }

  const newLobby = {
    link: generateUniqueLink(LINK_LENGTH),
    host: id,
    title: '',
    game: {}
  };

  lobbies.push(newLobby);

  return newLobby;
};

const cancelLobby = (canceled) => {
  lobbies = lobbies.filter(lobby => lobby.link !== canceled.link);
};

const listLobbies = () => {
  console.log(lobbies);
};

const updateLobby = (update) => {
  const index = lobbies.findIndex(lobby => lobby.link === update.link);

  lobbies[index] = update;
};

const getLobby = (link) => {
  return lobbies.find(lobby => lobby.link === link);
};

module.exports = { createLobby, cancelLobby, listLobbies, updateLobby, getLobby };
