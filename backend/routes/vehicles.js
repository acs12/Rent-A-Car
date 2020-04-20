const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');


//get all vehicles
router.get('/', async (req,res) => {
    
    try{
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    }
    catch(err){
        res.json({message:err});
    }
});


//create a user
router.post('/',  (req,res) => {
    const vehicle = new Vehicle({
        type: req.body.type,
        price: req.body.price,
        make: req.body.make,
        modelYear: req.body.modelYear,
        currentMileage: req.body.currentMileage,
        condition: req.body.condition,
        timeLastServiced: req.body.timeLastServiced
    });

    try{
        const savedVehicle =  vehicle.save();
        res.json(savedVehicle);
    }
    catch (err) {
        res.json({message:err});
    }

});

//get a specific user 
router.get('/:vehicleId', async (req,res) => {
    try{
        const vehicle = await Vehicle.findById(req.params.vehicleId);
        res.json(vehicle);
    }
    catch (err){
        res.json({ message: err});
    }
});

//delete a user
router.delete('/:vehicleId', async (req, res) => {
    try{
        const removedVehicle = await Vehicle.remove({_id: req.params.vehicleId});
        res.json(removedVehicle);
    }
    catch (err) {
        res.json({message: err});
    }
});

//update a user 
router.patch('/:vehicleId', async (req, res) => {
    try {
        const updatedVehicle = await Vehicle.updateOne(
            {_id: req.params.vehicleId},
            { $set: {
                currentMileage: req.body.currentMileage,
                condition: req.body.condition,
                timeLastServiced: req.body.timeLastServiced
              
            }}
        );
        res.json(updatedVehicle);
    }
    catch (err) {
        req.json({ message: err });
    }
});


module.exports = router;
