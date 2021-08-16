const express = require('express');
const authMiddleware = require('../middlewares/auth');

const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
    res.send(200)
});

module.exports = app => app.use('/user', router);