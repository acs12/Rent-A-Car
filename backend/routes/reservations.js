const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

//get all user
router.get('/', async (req,res) => {
    try{
        const reservations = await reservations.find();
        res.json(reservations);
    }
    catch(err){
        res.json({message:err});
    }
});

//create a user
router.post('/', async (req,res) => {
    const reservation = new Reservation({
        user_id: req.body.user_Id,
        vehicle_id: req.body.vehicle_Id,
        pickupLocation: req.body.pickupLocation,
        returnLocation: req.body.returnLocation,
        pickupTime: req.body.pickupTime, 
        returnTime: req.body.returnTime,
        lengthOfRental: req.body.lengthOfRental

    });
    try{
        const savedReservation = await reservation.save();
        res.json(savedReservation);
    }
    catch (err) {
        res.json({message:err});
    }

});

//get a specific user 
router.get('/:reservationId', async (req,res) => {
    try{
        const reservation = await Reservation.findById(req.params.reservationId);
        res.json(reservation);
    }
    catch (err){
        res.json({ message: err});
    }
});

//delete a user
router.delete('/:reservationId', async (req, res) => {
    try{
        const removedReservation = await Reservation.remove({_id: req.params.reservationId});
        res.json(removedReservation);
    }
    catch (err) {
        res.json({message: err});
    }
});

//update a user 
router.patch('/:reservationId', async (req, res) => {
    try {
        const updatedReservation = await Reservation.updateOne(
            {_id: req.params.reservationId},
            { $set: {returnTime: req.body.returnTime}}
        );
        res.json(updatedReservation);
    }
    catch (err) {
        req.json({ message: err });
    }
});


module.exports = router;
