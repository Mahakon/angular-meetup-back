const express = require('express');
const userSession = require('../../../sessions/UserSession');
const db = require('../../../db/DataBase');

const router = express.Router();

router.get('/check', (req, res, next) => {
  console.log('come such user' + req.session);

  if (req.session.user_id !== undefined) {
    next('route')
  } else {
    res.status(404).send({error: "not found"});
  }
});

const isValidId = function (req, res, next) {
  db.isUser(req.session.user_id)
    .then(
      ans => {
        if (ans) {
          next();
        } else {
          res.status(404).send({error: "not found"});
        }
      },
      err => {
        res.status(500).send({ error: err });
      }
    );
};

const getUserData = function(req, res) {
  db.getUserData(req.session.user_id)
    .then(
      data => {
        res.send({ ...data, id: req.session.user_id })
      },
      err => {
        res.status(500).send({ error: err });
      }
    )
};

router.use(isValidId, getUserData);

module.exports = router;

