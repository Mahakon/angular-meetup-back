const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const bd = require('./db/DataBase');
const userSession = require('./sessions/UserSession');
const apiRouter =require('./routers/api/apiRouter');
const staticRouter = require('./routers/static/staticRouter');

const PORT = process.env.PORT || 3000;
const app = express();
const expressWs = require('express-ws')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: '*'}));

app.use(express.static(path.join(__dirname, '../static/public/dist')));
app.use(userSession.getSession());

bd.addUser(1234, 'maha');

app.use('/api', apiRouter);

app.use('/oauth', staticRouter);
app.use('chat', staticRouter);

app.listen(PORT, () =>
  console.log('Express app listening on localhost: ' + PORT));
