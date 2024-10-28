const express = require('express')
const router = express.Router()
const userModel = require('../models/user.model')
const productModel = require('../models/product.model')

router.post('/addToCart/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;
        const findUser = await userModel.findById(userId);

        if (findUser) {
            // Check if the product already exists in the cart
            const isProductInCart = findUser.cart.includes(productId);

            if (isProductInCart) {
                return res.status(400).json({ message: 'Product already in cart' });
            }

            // Add product to cart if not already present
            findUser.cart.push(productId);
            await findUser.save(); // Save updated user to the database
            res.status(200).json({ message: 'Added to cart', findUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/removeFromCart/:userId/:productId', async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const findUser = await userModel.findById(userId);

        if (findUser) {
            // Filter out the product from the cart
            const newCart = findUser.cart.filter(id => id !== productId);

            if (newCart.length === findUser.cart.length) {
                return res.status(400).json({ message: 'Product not found in cart' });
            }

            findUser.cart = newCart;
            await findUser.save();
            res.status(200).json({ message: 'Removed from cart', findUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/getCartItems/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const findUser = await userModel.findById(userId);
        if (findUser) {
            // Find products based on product IDs in the user's cart
            const productIds = findUser.cart;

            const products = await productModel.find({ _id: { $in: productIds } });

            // Map the products to get only the required fields
            const cartItems = products.map(product => ({
                id: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
            }));

            res.status(200).json(cartItems);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
