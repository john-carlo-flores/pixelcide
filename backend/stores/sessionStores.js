class SessionStore {
  constructor() {
    this.sessions = new Map();
  }

  findSession(id) {
    return this.sessions.get(id);
  };

  saveSession(id, session) {
    this.sessions.set(id, session);
  };

  deleteSession(id) {
    this.sessions.delete(id);
  };

  getAllSessions() {
    return [...this.sessions.values()]; 
  };
};

module.exports = { SessionStore };