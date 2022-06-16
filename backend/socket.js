const { Server } = require('socket.io');
const { verify } = require('./helpers/authentication');
const { createLobby, cancelLobby, listLobbies, updateLobby, getLobby } = require('./helpers/lobby');

module.exports = (sessionMiddleware, httpServer) => {
  const io = new Server(httpServer);

  // convert a connect middleware to a Socket.IO middleware
  const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
  
  io.use(wrap(sessionMiddleware));

  io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected!`);

    socket.on("Create New Lobby", () => {
      console.log("Create New Lobby"); 
      const lobby = createLobby(socket.id);
      console.log(lobby);
      socket.emit("Get Created Lobby", lobby);
    });

    socket.on("Cancel Lobby", (lobby) => {
      cancelLobby(lobby);
    });

    socket.on("Request Lobby", (link) => {
      const lobby = getLobby(link);
      console.log("Request Lobby:");
      console.log(lobby);
      socket.emit("Get Lobby", lobby);
    });

    socket.on("Update Lobby", (lobby) => {
      console.log("Update Lobby function call");
      console.log(lobby);
      const updatedLobby = updateLobby(lobby);
      console.log("Updated Lobby:");
      listLobbies();
    });

    socket.on("logout", (args) => {
      socket.disconnect();
    });

  });
};
