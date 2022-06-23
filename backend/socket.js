const { Server } = require("socket.io");
const { generateSessionID } = require("./helpers/authentication");
const { LobbyStore } = require("./stores/lobbyStores");
const { SessionStore } = require("./stores/sessionStores");
const postGameResults = require("./helpers/socketDb");

module.exports = (sessionMiddleware, httpServer, db) => {
  const io = new Server(httpServer);

  // convert a connect middleware to a Socket.IO middleware
  const wrap = (middleware) => (socket, next) =>
    middleware(socket.request, {}, next);

  // Use sessionMiddleware to listen to socket requests
  io.use(wrap(sessionMiddleware));

  // Instantiate stores as in memory storages
  const ls = new LobbyStore();
  const sessionStore = new SessionStore();

  // Map to correct user session before request
  io.use((socket, next) => {
    const sessionID = socket.handshake.auth.sessionID;

    // Assign session to socket based on sessionID
    if (sessionID) {
      // find existing session
      const session = sessionStore.findSession(sessionID);

      if (session) {
        console.log(`Reconnecting! ${session.username}`);
        socket.sessionID = sessionID;
        socket.userID = session.userID;
        socket.username = session.username;
        return next();
      }
    }

    // Check that username is provided
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }

    // Check that userID is provided
    const userID = socket.handshake.auth.userID;
    if (!userID) {
      return next(new Error("invalid userID"));
    }

    // Create new session
    socket.sessionID = generateSessionID();
    socket.userID = userID;
    socket.username = username;
    sessionStore.saveSession(sessionID, { userID, username });
    next();
  });

  // Handle socket connection and requests
  io.on("connection", (socket) => {
    console.log(`User ${socket.username} connected!`);

    // Send session id on connect
    socket.emit("session", {
      sessionID: socket.sessionID,
    });

    // Delete session and disconnect user
    socket.on("logout", () => {
      sessionStore.deleteSession(socket.sessionID);
      socket.disconnect();
    });

    /* ------------- LOBBIES ------------- */
    socket.on("Request Lobbies", () => {
      console.log(`${socket.username} Request Lobbies`);
      const lobbies = ls.listLobbies();

      socket.emit("Get Lobbies", lobbies);
    });

    /* ------------- LOBBY ------------- */
    socket.on("Create New Lobby", (host) => {
      console.log("New Lobby Created");
      const newLobby = ls.createLobby(host);

      socket.emit("Get Created Lobby", newLobby);
    });

    socket.on("Cancel Lobby", (lobby) => {
      console.log("Cancel Lobby");
      ls.cancelLobby(lobby);

      const lobbies = ls.listLobbies();
      socket.broadcast.to("lobbies").emit("Get Lobbies", lobbies);
    });

    socket.on("Request Lobby", (link) => {
      console.log("Request Lobby:", link);
      const requestedLobby = ls.getLobby(link);

      socket.emit("Get Lobby", requestedLobby);
      ls.listLobbies();
    });

    socket.on("Update Lobby", (lobby) => {
      console.log("Update Lobby", lobby.link);
      const updatedLobby = ls.updateLobby(lobby);
      console.log("Updated Lobby");
      console.log(updatedLobby);

      const lobbies = ls.listLobbies();

      socket.broadcast.to(updatedLobby.link).emit("Update Lobby", updatedLobby);
      socket.broadcast.to("lobbies").emit("Get Lobbies", lobbies);
    });

    /* ------------- ROOMS ------------- */
    socket.on("Join Room", (link) => {
      socket.join(link);
    });

    socket.on("Leave Room", (link) => {
      socket.leave(link);
    });

    /* ------------- GAME ------------- */
    socket.on("Update Game", (link, key, data) => {
      console.log("Update Game");
      console.log(link, key, data);
      ls.updateGame(link, key, data);

      socket.broadcast.to(link).emit("Update Game", key, data);
    });
    /* ----------- LOGS --------------*/
    socket.on("Start Game", (link) => {
      ls.startGameTimer(link);
    });

    socket.on("Game Over", (link, state) => {
      const game = ls.endGameTimerAndPost(link, state);
      postGameResults(game, db);
    });

    socket.on("Leaver", (link, id) => {
      const game = ls.endGameTimerAndPost(link, "LEAVE", id);
      postGameResults(game, db);
    });
  });
};
