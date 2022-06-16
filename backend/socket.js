const { Server } = require('socket.io');
const { verify } = require('./helpers/authentication');
const { createLobby } = require('./helpers/lobby');

module.exports = (sessionMiddleware, httpServer) => {
  const io = new Server(httpServer);

  // convert a connect middleware to a Socket.IO middleware
  const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
  
  io.use(wrap(sessionMiddleware));

  io.on("connection", (socket, title) => {
    console.log(`User ${socket.id} connected!`);

    socket.on("Create New Lobby", (title) => {
      console.log("Create New Lobby: ", title); 
      const lobby = createLobby(socket.id, title);

      socket.emit("Get New Lobby", lobby);
    });

    socket.on("logout", (args) => {
      socket.disconnect();
    });

  });
};
