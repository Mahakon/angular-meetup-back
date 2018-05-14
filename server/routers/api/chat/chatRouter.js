const express = require('express');
const db = require('../../../db/DataBase');

const router = express.Router();
const expressWs = require('express-ws')(router);
const addNewMessage = require('./addNewMessage');

let connections = [];

router.ws('/connection/:id', (ws, req) => {
  const curConn = {id: req.params.id, ws: ws};
  connections.push(curConn);
  console.log('connection with user ' + curConn.id + 'opened');

  ws.on('message', (msg) => {
    function sendAllOnlineUsers(res) {
      connections.forEach((conn) => {
        console.log('send event ' + res.event + ' data: ' + JSON.stringify(res.data));
        conn.ws.send(JSON.stringify(res));
      })
    }

    if (typeof msg === 'string') {
      msg = JSON.parse(msg);
    }

    switch (msg.event) {
      case 'ADD': {
        addNewMessage(msg.data)
          .then(
            data => sendAllOnlineUsers({ event: 'ADD', data: data })
          );
      } break;
    }
  });

  ws.on('close', () => {
    console.log('connection with user ' + curConn.id + 'closed');

    connections = connections.filter(conn => {
      if (conn === curConn) {
        return false;
      }

      return true;
    });
  });
});

module.exports = router;
