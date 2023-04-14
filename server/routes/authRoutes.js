const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/authMiddleware');
const { login, register } = require('../controllers/ownerControllers');


router.post('/register', authMiddleware, register);

router.post('/login', authMiddleware, login);

module.exports = router;

