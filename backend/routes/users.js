const express = require('express');
const router = express.Router();
const User = require('../models/User');

//get all user
router.get('/', async (req,res) => {
    try{
        const users = await users.find();
        res.json(users);
    }
    catch(err){
        res.json({message:err});
    }
});

//create a user
router.post('/', async (req,res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        dlState: req.body.dlState,
        dlNumber: req.body.dlNumber,
        emailAddress: req.body.emailAddress,
        creditCardInfo: req.body.creditCardInfo,
        residenceAddress: req.body.residenceAddress

    });
    try{
        const savedUser =  await user.save();
        res.json(savedUser);
    }
    catch (err) {
        res.json({message:err});
    }

});

//get a specific user 
router.get('/:userId', async (req,res) => {
    try{
        const user = await User.findById(req.params.userId);
        res.json(user);
    }
    catch (err){
        res.json({ message: err});
    }
});

//delete a user
router.delete('/:userId', async (req, res) => {
    try{
        const removedUser = await User.remove({_id: req.params.userId});
        res.json(removedUser);
    }
    catch (err) {
        res.json({message: err});
    }
});

//update a user 
router.patch('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            {_id: req.params.userId},
            { $set: {
                password: req.body.password,
                emailAddress: req.body.emailAddress,
                creditCardInfo: req.body.creditCardInfo,
                residenceAddress: req.body.residenceAddress
        
            }}
        );
        res.json(updatedUser);
    }
    catch (err) {
        req.json({ message: err });
    }
});


module.exports = router;
