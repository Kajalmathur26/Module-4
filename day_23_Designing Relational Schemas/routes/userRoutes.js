// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { signupUser, deleteUser } = require('../controllers/userController');

router.post('/signup', signupUser);

router.delete('/delete-user/:userId', deleteUser);

module.exports = router;