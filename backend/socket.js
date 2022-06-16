const { Server } = require('socket.io');
const { verify } = require('./helpers/authentication');
const { LobbyStore } = require('./stores/lobbyStores');

module.exports = (sessionMiddleware, httpServer) => {
  const io = new Server(httpServer);

  // convert a connect middleware to a Socket.IO middleware
  const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
  
  io.use(wrap(sessionMiddleware));

  const ls = new LobbyStore();

  io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected!`);

    socket.on("Create New Lobby", () => {
      const newLobby = ls.createLobby();
      socket.emit("Get Created Lobby", newLobby);
    });

    socket.on("Cancel Lobby", (lobby) => {
      ls.cancelLobby(lobby);
    });

    socket.on("Request Lobby", (link) => {
      const requestedLobby = ls.getLobby(link);
      socket.emit("Get Lobby", requestedLobby);
    });

    socket.on("Update Lobby", (lobby) => {
      const updatedLobby = ls.updateLobby(lobby);
      console.log("Updated Lobby:");
      ls.listLobbies();
    });

    socket.on("logout", (args) => {
      socket.disconnect();
    });

  });
};
