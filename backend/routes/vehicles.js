const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');


//get all vehicles
router.get('/', async (req, res) => {

    try {
        Vehicle.find()
            .exec()
            .then(result => {
                res.send(result)
            })
    }
    catch (err) {
        res.json({ message: err });
    }
});


//create a user
router.post('/', (req, res) => {
    new Vehicle({
        carname: req.body.carname,
        type: req.body.type,
        price: req.body.price,
        make: req.body.make,
        modelYear: req.body.modelYear,
        currentMileage: req.body.currentMileage,
        condition: req.body.condition,
        timeLastServiced: req.body.timeLastServiced,
        availability: req.body.availability,
        rentalLocation: req.body.locationId

    }).save()
        .then(result => {
            Vehicle.find()
                .exec()
                .then(result => {
                    res.send(result)
                })
        })
        .catch(err => {
            res.send(err)
        })

});

//get a specific user 
router.get('/:vehicleId', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.vehicleId);
        res.json(vehicle);
    }
    catch (err) {
        res.json({ message: err });
    }
});

//delete a user
router.post('/delete', async (req, res) => {
    try {
        Vehicle.remove({ _id: req.body._id })
            .exec()
            .then(result => {
                Vehicle.find()
                    .exec()
                    .then(result => {
                        res.send(result)
                    })
            })
    }
    catch (err) {
        res.json({ message: err });
    }
});

//update a user 
router.post('/upate', async (req, res) => {
    try {
        Vehicle.updateOne(
            { _id: req.body._id },
            {
                $set: {
                    carname: req.body.carname,
                    type: req.body.type,
                    price: req.body.price,
                    make: req.body.make,
                    modelYear: req.body.modelYear,
                    currentMileage: req.body.currentMileage,
                    condition: req.body.condition,
                    timeLastServiced: req.body.timeLastServiced,
                    availability: req.body.availability,
                    rentalLocation: req.body.locationId
                }
            }
        ).exec()
            .then(result => {
                Vehicle.find()
                    .exec()
                    .then(result => {
                        res.send(result)
                    })
            })
    }
    catch (err) {
        req.json({ message: err });
    }
});

//get vehicle Name
router.post('/allVehicles/IDs', async (req, res) => {
    console.log("inside", req.body)
    await Vehicle.find(
        {
            rentalLocation: {$ne: req.body.locationId}
        }
    ).select("carname").exec()
        .then(result => {
            console.log(result)
            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })
});


module.exports = router;
