const express = require('express');
const router = express.Router();

const { register,login, getAllUsers } = require('../controllers/auth.controller.js');

router.get('/', (req, res) => {
    res.send('auth route welcome');
});
router.get('/getAllUsers', getAllUsers);
router.post('/register', register);
router.post('/login',login);


module.exports = router;
