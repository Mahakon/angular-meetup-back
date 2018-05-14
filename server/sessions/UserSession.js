const session = require('express-session');
const SessionStore = require('./SessionStore');

class UserSession {
  constructor() {
    this.sessionStore = SessionStore.getInstance();
  }

  getOptions() {
    return {
      secret: 'angular meetup',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true
      },
      store: this.sessionStore,
    }
  }

  getSession() {
    return session(this.getOptions());
  }

  getSessionStore() {
    return this.sessionStore;
  }
}

module.exports = new UserSession();
