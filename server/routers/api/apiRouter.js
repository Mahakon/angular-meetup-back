const express = require('express');

const sessionRouter = require('./session/sessionRouter');
const chatRouter = require('./chat/chatRouter');
const router = express.Router();

router.use('/session', sessionRouter);
router.use('/chat', chatRouter);

module.exports = router;
