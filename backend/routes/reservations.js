const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Vehicle = require('../models/Vehicle');

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
        user: req.body.user,
        vehicle: req.body.vehicle,
        pickupLocation: req.body.pickupLocation,
        returnLocation: req.body.returnLocation,
        pickupTime: req.body.pickupTime, 
        expectedReturnTime : req.body.expectedReturnTime,
        });

    if (pickupTime - Date.now < 86,400,000){  //24hr = 86400000 miliseconds

        v = Vehicle.findById(vehicle)
       
        if(v.availability == true){

     try{
        const savedReservation = await reservation.save();
        v.availability = false
        res.json(savedReservation);
    }
     catch (err) {
        res.json({message:err});
    }
}
        else{
            print("The Car you chose is already booked, here are some alternatives at other locations")
            alter = Vehicle.find({ type: v.type })
            alters = []
            for( i=0; i++; i < alter.length())
             if ((alter[i]).availability == true){
                 alters.append(alter[i])
             }

            return alters
        };
   
    }
    else{
        print("Reservation rejected, please book one day before pickup time")
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
            { $set: {lengthOfRental: req.body.lengthOfRental}}
        );
        res.json(updatedReservation);
    }
    catch (err) {
        req.json({ message: err });
    }
});


module.exports = router;
