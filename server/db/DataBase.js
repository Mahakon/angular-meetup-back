const sqlite3 = require('sqlite3');
const path = require('path');
const { dbName } = require('../config');

class DataBase {
  constructor() {
    this.db = new sqlite3.Database(
      path.join(__dirname, './' + dbName),
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the chat database.');
    });

    this.userTableName = 'user';
    this.messageTableName = 'message';

    this.db.serialize(() => {
      const SQLUserTable =
        `CREATE TABLE IF NOT EXISTS ${this.userTableName}(
           id INTEGER PRIMARY KEY,
           login TEXT NOT NULL);`;

      const SQLMessageTable =
        `CREATE TABLE IF NOT EXISTS ${this.messageTableName}(
           id INTEGER PRIMARY KEY,
           user_id INTEGER NOT NULL, 
           content TEXT,
            FOREIGN KEY (user_id) REFERENCES ${this.userTableName}(id));`;

      this.db
        .run(SQLUserTable)
        .run(SQLMessageTable)
    })
  }

  addUser(login) {
    return new Promise((resolve, reject) => {
      const SQL =
        `INSERT INTO ${this.userTableName}(login)
           VALUES("${login}")`;

      this.db.run(SQL, function(err) {
        if (err) {
          console.log(err.message);
          reject(err);
        }

        resolve(this.lastID);
      })
    })
  }

  isUser(userId) {
    return new Promise((resolve, reject) => {
      const SQL =
        `SELECT COUNT(*)
           FROM ${this.userTableName}
             WHERE id = ${userId}`;

      this.db.get(SQL, (err, row) => {
        if (err) {
          console.log(err.message);
          reject(err);
        }

        resolve(!!+row['COUNT(*)']);
      })
    })
  }

  isLogin(login) {
    return new Promise((resolve, reject) => {
      const SQL =
        `SELECT COUNT(*)
           FROM ${this.userTableName}
             WHERE login = "${login}"`;

      this.db.get(SQL, (err, row) => {
        if (err) {
          console.log(err.message);
          reject(err);
        }
        console.log(row);

        resolve(!!+row['COUNT(*)']);
      })
    })
  }

  getUserData(userId) {
    return new Promise((resolve, reject) => {
      const SQL =
        `SELECT login
           FROM ${this.userTableName}
             WHERE id = ${userId}`;

      this.db.get(SQL, (err, row) => {
        if (err) {
          console.log(err.message);
          reject(err);
        }

        resolve(row);
      })
    })
  }

  addMessage(userId, content) {
    return new Promise((resolve, reject) => {
      const SQL =
        `INSERT INTO ${this.messageTableName}(user_id, content)
           VALUES(${userId}, "${content}")`;

      this.db.run(SQL, function(err) {
        if (err) {
          console.log(err.message);
          reject(err);
        }

        resolve(this.lastID);
      })
    })
  }

  deleteMessage(messageId) {
    return new Promise((resolve, reject) => {
      const SQL =
        `DELETE FROM ${this.messageTableName}
          WHERE id = ${messageId}`;

      this.db.run(SQL, function(err) {
        if (err) {
          console.log(err.message);
          reject(err);
        }
        resolve('success')
      });
    })
  }

  getAllMessages() {
    return new Promise((resolve, reject) => {
      const SQL =
        `SELECT ${this.messageTableName}.id as messageId,
          ${this.messageTableName}.user_id as userId,
          ${this.messageTableName}.content,
          ${this.userTableName}.login
           FROM ${this.messageTableName}
            INNER JOIN ${this.userTableName} 
              ON ${this.messageTableName}.user_id=${this.userTableName}.id`;

      this.db.all(SQL, (err, row) => {
        if (err) {
          console.log(err.message);
          reject(err);
        }

        resolve(row);
      })
    })
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  }
}

module.exports = new DataBase();
