const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
JWT_SECRET=process.env.JWT_SECRET

router.get('/', (req, res) => {
    res.send('auth route welcome');
});
router.get('/getAllUsers',async (req, res) => {
    try {
        const getUsers = await userModel.find();
        return res.status(200).json(getUsers);
    } catch (error) {
        
    }
})
router.post('/register', async(req, res) => {
    const {name,email,password} = req.body;
    try {
        if(!name ||!email ||!password) {
            return res.status(400).json({ message: 'missing_fields' });
        }
        const emailExist = await userModel.findOne({email: email});
        if(emailExist) {
            return res.status(400).json({ message: 'email_exists' });
        }
        const hasPassword = await bcryptjs.hash(password,10);
        const newUser = new userModel({name: name, email:email,password:hasPassword});
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ message:'Server side error' });
    }
});
router.post('/login', async(req, res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email: email});
        if(!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const matchPassword = await bcryptjs.compare(password, user.password);
        if(!matchPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token  = jwt.sign({id:user._id,email:user.email},JWT_SECRET,{expiresIn:'1h'})

        return res.status(200).json({message: 'Logged in successfully',token:token});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:'Server side error' });
    }
});


module.exports = router;
