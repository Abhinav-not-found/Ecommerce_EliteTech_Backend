const express = require('express');
const router = express.Router();
const {create,getAllProducts,updateProduct,deleteProduct,getProductById} = require('../controllers/product.controller.js');

router.get('/', (req, res)=>{
    res.send('Welcome to product routes')
})

router.post('/create',create)
router.get('/getAllProducts',getAllProducts)
router.get('/getProductById/:id',getProductById)
router.put('/updateProduct/:id',updateProduct)
router.delete('/deleteProduct/:id',deleteProduct)


module.exports = router
