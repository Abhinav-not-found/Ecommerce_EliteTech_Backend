const express = require('express');
const router = express.Router();
const productModel = require('../models/product.model');

router.get('/', async (req, res) => {
    const searchQuery = req.query.q;
    try {
        const products = await productModel.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },  
                { category: { $regex: searchQuery, $options: 'i' } },  
                { description: { $regex: searchQuery, $options: 'i' } } 
            ]
        });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
