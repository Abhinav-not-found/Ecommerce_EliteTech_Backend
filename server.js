const express = require('express');
const colors = require('colors');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();



app.get('/', async(req, res)=>{
    res.send('Hello ecommerce')
})



mongoose.connect(process.env.DB).then(() => {
    console.log('Connected to MongoDB'.bgGreen);
}).catch(err => console.log(`Error connecting to MongoDB: ${err}`.red));

app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`.bgCyan)});
