const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const { dbName } = require('../config');
const path = require('path');

class SessionStore {
  static getOptions() {
    return {
      table: 'session',
      db: dbName,
      dir: path.join(__dirname, '../db'),
      concurrentDB: true
    };
  }

  static getInstance() {
    return new SQLiteStore(this.getOptions());
  }
}

module.exports = SessionStore;
