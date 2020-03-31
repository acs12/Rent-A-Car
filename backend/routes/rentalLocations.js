const express = require('express');
const router = express.Router();
const RentalLocation = require('../models/RentalLocation');

//get all user
router.get('/', async (req,res) => {
    try{
        const rentalLocations = await rentalLocations.find();
        res.json(rentalLocations);
    }
    catch(err){
        res.json({message:err});
    }
});

//create a user
router.post('/', async (req,res) => {
    const rentalLocation = new RentalLocation({
     name: req.body.name,
     address: req.body.address,
     capacity: req.body.capacity,
     numOfCars: req.body.numOfCars,
     vehicle_id: req.body.vehicle_id

    });
    try{
        const savedRentalLocation = await rentalLocation.save();
        res.json(savedRentalLocation);
    }
    catch (err) {
        res.json({message:err});
    }

});

//get a specific user 
router.get('/:rentalLocationId', async (req,res) => {
    try{
        const rentalLocation = await RentalLocation.findById(req.params.rentalLocationId);
        res.json(rentalLocation);
    }
    catch (err){
        res.json({ message: err});
    }
});

//delete a user
router.delete('/:rentalLocationId', async (req, res) => {
    try{
        const removedRentalLocation = await RentalLocation.remove({_id: req.params.rentalLocationId});
        res.json(removedRentalLocation);
    }
    catch (err) {
        res.json({message: err});
    }
});

//update a user 
router.patch('/:rentalLocationId', async (req, res) => {
    try {
        const updatedRentalLocation = await RentalLocation.updateOne(
            {_id: req.params.rentalLocationId},
            { $set: {
               
                vehicle_id: req.body.vehicle_id

            }}
        );
        res.json(updatedRentalLocation);
    }
    catch (err) {
        req.json({ message: err });
    }
});


module.exports = router;