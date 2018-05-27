const express = require('express');

const sessionRouter = require('./session/sessionRouter');
const chatRouter = require('./chat/chatRouter');
const authRouter = require('./auth/authRouter');

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/chat', chatRouter);
router.use('/auth', authRouter);

module.exports = router;
