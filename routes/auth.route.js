const express = require('express');
const router = express.Router();

const { register,login, getAllUsers,adminLogin,profile } = require('../controllers/auth.controller.js');

router.get('/', (req, res) => {
    res.send('Welcome to auth routes');
});
router.get('/getAllUsers', getAllUsers);
router.post('/register', register);
router.post('/login',login);
router.post('/adminLogin',adminLogin);
router.get('/profile', profile);

module.exports = router;
