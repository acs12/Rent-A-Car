const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Vehicle = require('../models/Vehicle');
const RentalLocation = require('../models/RentalLocation');
const VehicleType = require('../models/VehicleType');
const Rating= require('../models/Rating');

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
        returned: false
        });

    if (pickupTime - Date.now < 86,400,000){  //24hr = 86400000 miliseconds

      if(v.availability == true){

     try{
        const savedReservation = await reservation.save();
        RentalLocation.findByIdAndUpdate(req.body.rentalLocation,{$inc:{numOfVehicles:-1}});  
        Vehicle.findByIdAndUpdate(req.body.vehicle,{$set:{availability: false}});   
        res.json(savedReservation);
    }
     catch (err) {
        res.json({message:err});
    }
}
        else{
            alter = Vehicle.find({ type: v.type });
            alters = [];
            for( i=0; i++; i < alter.length())
             if ((alter[i]).availability == true){
                 alters.append(alter[i]);
             }
            res.json({message:"The Car you chose is already booked, here are some alternatives at other locations"});
            res.json(alters);
        }
        r = RentalLocation.findById(req.body.rentalLocation);
        if(r.numOfVehicles == r.capacity){
            res.json({message:"The park of this return location is full now, please choose another one"})
        }
    }
    else{
        res.json({message:"Reservation rejected, please book one day before pickup time"})
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
            { $set: {returned: true}});

            new Rating({
                rating: req.body.rating,
                comment: req.body.comment,
                vehicle: r.vehicle
            });

       
    }
    catch (err) {
        req.json({ message: err });
    }

  
   
    v = Vehicle.findById(r.vehicle);
    f = VehicleType.findById(v.type);
    if (Date.now > r.expectedReturnTime){
        
        res.json({message:"Successfully Return!"});
        res.json({message:"Your late return fee is" + String(((Date.now - r.expectedReturnTime)/86400000)* f.lateFee)})
        res.json({message:"Thank you! See you next time!"});
    }
    else{
        res.json({message:"Successfully Return!"});
        res.json({message:"Thank you! See you next time!"});
    }

    
});


module.exports = router;
