const productModel = require('../models/product.model.js')

const create = async(req,res)=>{
    const {name,description,image,price,category} = req.body
    try {
        if(!name || !description || !image || !price || !category){
            return res.status(400).json({ message: 'All fields are required' });
        }
        const product = new productModel({name:name,description:description,image:image,price:price,category:category});
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.log(error)
        res.status(400).json({message:'Server Side Error'});
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message:'Server side error' });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if(!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message:'Server side error' });
    }
}

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message:'Server side error' });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
        if(!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message:'Server side error' });
    }
}
module.exports = {create,getAllProducts,updateProduct,deleteProduct,getProductById}
