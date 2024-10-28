const express = require('express');
const router = express.Router();

const { register,login, getAllUsers,adminLogin,profile } = require('../controllers/auth.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.get('/', (req, res) => {
    res.send('Welcome to auth routes');
});
router.get('/getAllUsers', getAllUsers);
router.post('/register', register);//done
router.post('/login',login);//done
router.post('/adminLogin',adminLogin);//done
router.get('/profile', authMiddleware ,profile);//done

module.exports = router;
