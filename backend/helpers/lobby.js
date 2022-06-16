const { generateUniqueLink } = require('../helpers/authentication');

const MAX_NUM_ROOMS = 20;
const LINK_LENGTH = 8;

const lobbies = [];

const createLobby = (id, title) => {
  if (lobbies.length === MAX_NUM_ROOMS) {
    return false;
  }

  const newLobby = {
    link: generateUniqueLink(LINK_LENGTH),
    host: id,
    title,
    game: {}
  };

  lobbies.push(newLobby);

  return newLobby;
};

module.exports = { createLobby };
