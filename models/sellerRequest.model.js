const mongoose = require('mongoose')
const sellerRequestSchema = mongoose.Schema({
    userId:{type:String, required:true,unique:true},
    email:{type:String, required:true,},
    name:{type:String, required:true,},
    role:{type:String, required:true,},
    action:{
        type:String, 
        enum:['pending','accepted','rejected'],
        default:'pending'
    }
})
const  sellerRequest = mongoose.model('Seller_Request',sellerRequestSchema)
module.exports = sellerRequest
