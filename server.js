const express = require('express');
const colors = require('colors');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(express.json())
app.use(cors());
app.get('/', async(req, res)=>{
    res.send('Hello ecommerce')
})

const authRoute = require('./routes/auth.route.js')
app.use('/api/auth',authRoute);

const adminRoute = require('./routes/admin.route.js')
app.use('/api/admin',adminRoute);

const productRoute = require('./routes/product.route.js')
app.use('/api/product',productRoute)

const cartRoute = require('./routes/cart.route.js')
app.use('/api/cart',cartRoute)

const searchRoute = require('./routes/search.route.js')
app.use('/api/search',searchRoute)


mongoose.connect(process.env.DB).then(() => {
    console.log('Connected to MongoDB'.bgGreen);
}).catch(err => console.log(`Error connecting to MongoDB: ${err}`.red));

app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`.bgCyan)});



    