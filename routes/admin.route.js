const express = require('express');
const router = express.Router();
const sellerRequestModel = require('../models/sellerRequest.model')
const userModel = require('../models/user.model')








router.get('/getAllUsers',async(req,res)=>{
    try {
        const users = await userModel.find()
        res.json(users)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})




router.post('/sellerRequest', async (req, res) => {
    try {
        const userId = req.params.userId
        const checkUserId = await sellerRequestModel.findById(userId)
        if(checkUserId){
            res.status(404).json({message:'Already sent a request'})
        }
        else{
            const sellerRequest = new sellerRequestModel(req.body)
            await sellerRequest.save()
            res.status(201).json(sellerRequest)
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
router.get('/getSellerRequest', async (req, res) => {
    try {
        const sellerRequest = await sellerRequestModel.find()
        res.json(sellerRequest)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.put('/acceptRequest', async (req, res) => {
    try {
        const userId = req.body.userId;

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { role: 'manager' },
            { new: true } // Return the updated document
        );

        // Update the seller request's action to 'accepted'
        const updatedRequest = await sellerRequestModel.findOneAndUpdate(
            { userId: userId },
            { action: 'accepted' }, // Update action to 'accepted'
            { new: true } // Return the updated request
        );

        // Check if both updates were successful
        if (updatedUser && updatedRequest) {
            res.status(200).json({ user: updatedUser, request: updatedRequest });
        } else {
            res.status(404).json('User or request not found');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.put('/rejectRequest',async (req, res) => {
    try {
        const userId = req.body.userId;
        const updatedRequest = await sellerRequestModel.findOneAndUpdate(
            { userId: userId },
            { action:'rejected' }, // Update action to 'rejected'
            { new: true } // Return the updated request
        );
        if(updatedRequest){
            res.status(200).json('Rejected request')
        }
        else{
            res.status(404).json('Request not found')
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
})

module.exports = router
