const express = require('express');
const multer  = require('multer');
const db = require('../../../db/DataBase');

const upload = multer();
const router = express.Router();

router.post('/', upload.fields([]), (req, res) => {
  const login = req.body.login;
  db.addUser(login)
    .then(
      id => {
        req.session.user_id = id;
        res.send({ id: id, login: login })
      },
      err => {
        res.status(500).send({error: err});
      }
    )
});

router.post('/check', upload.fields([]), (req, res) => {
  const login = req.body.login;
  db.isLogin(login)
    .then(
      ans => {
        res.send({ isLogin: ans })
      },
      err => {
        res.status(500).send({error: err});
      }
    )
});

module.exports = router;
