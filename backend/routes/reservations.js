const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const Vehicle = require("../models/Vehicle");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const reservations = await reservations.find();
    res.json(reservations);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const reservation = new Reservation({
      user: req.body.user,
      vehicle: req.body.vehicle,
      pickupLocation: req.body.pickupLocation,
      returnLocation: req.body.returnLocation,
      pickupTime: req.body.pickupTime,
      expectedReturnTime: req.body.expectedReturnTime
    });
    let v = await Vehicle.findOne(reservation.vehicle);
    let message = "";
    if (reservation.pickupTime - Date.now() < 86400000) {
      if (v.availability === true) {
        if (v.rentalLocation === reservation.pickupLocation) {
          const savedReservation = await reservation.save();
          v.availability = false;
          await v.save();
          res.json(savedReservation);
        } else {
          message = "The Car you chose is not available at this location, here are some alternatives at other locations";
        }
      } else {
        message =
          "The Car you chose is already booked, here is an alternative at other location";
      }
      const alternates = await Vehicle.find().and([
        { type: v.type },
        { availability: true }
      ]).populate("type").populate("rentalLocation");
      if (alternates.length > 0){
        res.json({
          message,
          vehicles: [{...alternates[0]._doc}]
        });
      }else {
        message =
          "No matching vehicle found, please choose some other combination";
        res.json({
          message,
          vehicles: [{...alternates[0]}]
        });
      }
    } else {
      res.json({
        message: "Reservation rejected, please book one day before pickup time"
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:reservationId", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    res.json(reservation);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:reservationId", async (req, res) => {
  try {
    const removedReservation = await Reservation.remove({
      _id: req.params.reservationId
    });
    res.json(removedReservation);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:reservationId", async (req, res) => {
  try {
    const updatedReservation = await Reservation.updateOne(
      { _id: req.params.reservationId },
      { $set: { lengthOfRental: req.body.lengthOfRental } }
    );
    res.json(updatedReservation);
  } catch (err) {
    req.json({ message: err });
  }
});

module.exports = router;
