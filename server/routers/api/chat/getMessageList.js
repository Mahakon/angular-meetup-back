const db = require('../../../db/DataBase');

function getMessageList(req, res) {
  db.getAllMessages()
    .then(
      list => {
        res.send(list)
      },
      err => {
        res.status(500).send({ error: err })
      }
    )
}

module.exports = getMessageList;
