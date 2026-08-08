const express = require('express');
const { registerStudent, loginStudent, verifySession, logoutStudent } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', registerStudent);
router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.post('/logout', logoutStudent);
router.get('/verify', verifySession);

module.exports = router;
