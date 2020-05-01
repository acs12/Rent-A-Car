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

    try{
        
    if(req.body.pickupTime - Date.now() <86400000){
             
     const v = await Vehicle.findById(req.body.vehicle);

     if(v.availability == true){
        
        const r = await RentalLocation.findById(req.body.returnLocation);

        if(r.numOfVehicles == r.capacity){
            res.json({message:"The park of this return location is full now, please choose another one"})
        }
        else{    

        const savedReservation = await reservation.save();
        await RentalLocation.findByIdAndUpdate(req.body.returnLocation,{$inc:{numOfVehicles:-1}});  
        await Vehicle.findByIdAndUpdate(req.body.vehicle,{$set:{availability: false}});   
        res.json(savedReservation);
       }
    }

     else{
            const alter = await Vehicle.find({ type: v.type });
            alters = [];
            for( i=0; i++; i < alter.length())
             if ((alter[i]).availability == true){
                 alters.append(alter[i]);
             }
            res.json({message:"The Car you chose is already booked, here are some alternatives at other locations",
                      alternatives: alters});
            
        }
      
    }
    
     else{
        res.json({message:"Reservation rejected, please book one day before pickup time!"});
    }

}
    catch(err){
        res.json({message:err});
    }
});


router.get('/:reservationId', async (req,res) => {
    try{
        const reservation = await Reservation.findById(req.params.reservationId);
        res.json(reservation);
    }
    catch (err){
        res.json({ message: err});
    }
});

router.delete('/:reservationId', async (req, res) => {
    try{
        const removedReservation = await Reservation.remove({_id: req.params.reservationId});
        res.json(removedReservation);
    }
    catch (err) {
        res.json({message: err});
    }
});

// return a vehicle
router.patch('/:reservationId', async (req, res) => {
    
   
    try {
        const updatedReservation = await Reservation.updateOne(
            {_id: req.params.reservationId},
            { $set: {returned: true}});    // Return a vehicle and set its "returned" to True

            r = await Reservation.findById(req.params.reservationId);
            await RentalLocation.findByIdAndUpdate(r.returnLocation,
            
                {$inc:{numOfVehicles:1}})   // the number of vehicles at the return location + 1

           const v = await Vehicle.findById(r.vehicle);
           const f = await VehicleType.findById(v.type);
            
           if (Date.now - r.expectedReturnTime > 0){
                
                res.json({message:"Successfully Return!", 
                          lateFee: (((Date.now - r.expectedReturnTime.getTime())/86400000)* f.lateFee)})
               
            }
            else{
                res.json({message:"Successfully Return!" + "See you next time!"});
                
            }

            const rating = new Rating({
                rating: req.body.rating,
                comment: req.body.comment,
                vehicle: r.vehicle
            });
            await rating.save();
        
       
    }
    catch (err) {
        req.json({ message: err });
    }

  });


module.exports = router;
