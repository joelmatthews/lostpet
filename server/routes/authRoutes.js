const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/ownerControllers');
const { validateOwner } = require('../middleware/ownerValidation');


router.post('/register', validateOwner, register);

router.post('/login', login);

module.exports = router;

