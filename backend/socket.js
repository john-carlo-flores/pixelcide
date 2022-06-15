const { Server } = require('socket.io');
const { verify } = require('./helpers/authentication');

module.exports = (sessionMiddleware, httpServer) => {
  const io = new Server(httpServer);

  // convert a connect middleware to a Socket.IO middleware
  const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
  
  io.use(wrap(sessionMiddleware));

  io.on("connection", verify, (socket) => {
    console.log("User connected!");
  });
};
