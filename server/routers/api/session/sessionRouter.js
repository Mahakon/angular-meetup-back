const express = require('express');
const userSession = require('../../../sessions/UserSession');
const db = require('../../../db/DataBase');

const router = express.Router();

router.get('/set', (req, res) => {
  db.isUser(req.query.user_id)
    .then(
      ans => {
        if (!ans) {
          res.status(404).send({ error: "not found" });
          res.end();
        }

        req.session.user_id = req.query.user_id;
        res.send({ userId: req.session.user_id })
      },
      err => {
        res.status(500).send({ error: err });
      }
    );
});

router.get('/delete', (req, res) => {
  userSession.getSessionStore().destroy(req.session.id, (err) => {
    if (err) {
      res.status(500).send({ error: err });
    }

    res.send({ result: "success" });
  });
});

module.exports = router;

