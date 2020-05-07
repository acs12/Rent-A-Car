const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Reservation = require("../models/Reservation");
const Vehicle = require("../models/Vehicle");
const RentalLocation = require("../models/RentalLocation");
const VehicleType = require("../models/VehicleType");
const Rating = require("../models/Rating");
const perPage = 20;
const { auth, checkAuth } = require("../config/passport");
auth();

router.get("/", checkAuth, async (req, res) => {
  try {
    const reservations = await reservations.find();
    res.json(reservations);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/userReservations/:userID/", checkAuth, async (req, res) => {
  try {
    const { userID } = { ...req.params, ...req.query };
    const reservation = await Reservation.findOne()
      .and([
        {
          user: mongoose.Types.ObjectId(userID)
        },
        { returned: false }
      ])
      .limit(1)
      .populate("vehicle")
      .populate("pickupLocation")
      .populate("returnLocation")
      .populate("address");
    const reservationHistory = await Reservation.find()
      .and([
        {
          user: mongoose.Types.ObjectId(userID)
        },
        { returned: true }
      ])
      .populate("vehicle")
      .populate("pickupLocation")
      .populate("returnLocation")
      .populate("address");
    res.json({ reservation, reservationHistory });
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", checkAuth, async (req, res) => {
  try {
    const reservation = new Reservation({
      user: req.body.user,
      vehicle: req.body.vehicle,
      pickupLocation: req.body.pickupLocation,
      returnLocation: req.body.returnLocation,
      pickupTime: req.body.pickupTime,
      expectedReturnTime: req.body.expectedReturnTime,
      status: "Reserved"
    });
    let v = await Vehicle.findById(reservation.vehicle._id)
      .populate("type")
      .populate("rentalLocation")
      .populate({
        path: "rentalLocation",
        populate: {
          path: "address",
          model: "Address"
        }
      });

    let message = "";
    if (reservation.pickupTime - Date.now() < 86400000) {
      console.log(v)
      if (v.availability === true) {
        
        if (
          mongoose.Types.ObjectId(v.rentalLocation._id).equals(
            reservation.pickupLocation
          )
        ) {
          const savedReservation = await reservation.save();
          v.availability = false;
          await v.save();
          return res.json(savedReservation);
        } else {
          message =
            "The Car you chose is not available at this location, here are some alternatives at other locations";
        }
      } else {
        message =
          "The Car you chose is already booked, here is an alternative at other location";
      }

      const curZipCode = v.rentalLocation.address.zipcode
        .toString()
        .substring(0, 2);

      const alternates = await Vehicle.find()
        .and([{ type: v.type }, { availability: true }])
        .populate("type")
        .populate("rentalLocation")
        .populate({
          path: "rentalLocation",
          populate: {
            path: "address",
            model: "Address"
          }
        });

      const a = alternates.filter(a => {
        return a.rentalLocation.address.zipcode.includes(curZipCode);
      });
      if (a.length > 0) {
        return res.json({
          message,
          vehicles: [{ ...a[0]._doc }]
        });
      } else {
        message =
          "This vehicle is not available at this location and no replacement vehicle found, please choose some other combination";
        return res.json({
          message
        });
      }
    } else {
      return res.json({
        message: "Reservation rejected, please book one day before pickup time"
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get("/:reservationId", checkAuth, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    res.json(reservation);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:reservationId", checkAuth, async (req, res) => {
  try {
    const removedReservation = await Reservation.remove({
      _id: req.params.reservationId
    });
    res.json(removedReservation);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/cancelReservation/:reservationId", checkAuth, async (req, res) => {
  try {
    const currentTime = Date.now();
    const reservation = await Reservation.findById(
      req.params.reservationId
    ).populate({
      path: "vehicle",
      populate: {
        path: "type",
        model: "VehicleType"
      }
    });
    const charge = reservation.vehicle.type.hourlyRate;
    reservation.status = "Cancelled";
    reservation.returnTime = currentTime;
    reservation.returned = true;
    
    await Vehicle.findByIdAndUpdate(reservation.vehicle._id, {availability : true});
    const pickupTime = Date.parse(reservation.pickupTime);
    const seconds = (currentTime - pickupTime) / 1000;
    if (seconds < 3600) {
      reservation.totalPrice = charge;
    }
    await reservation.save();
    res.json({ message: "Reservation Cancelled!", reservation });
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch("/:reservationId", checkAuth, async (req, res) => {
  try {
    const { rating, condition } = req.body;
    
    const reservation = await Reservation.findById(req.params.reservationId)
      .populate("vehicle")
      .populate("type");
    let vehicle = await Vehicle.findById(reservation.vehicle._id);
    const vehicleType = await VehicleType.findById(
      reservation.vehicle.type._id
    );
    let totalPrice = 0;
    
    const initialSeconds = Date.now() - Date.parse(reservation.pickupTime);
    const initialHours = parseFloat(initialSeconds / (60 * 60 * 1000));
      
    if (initialHours <= 1) {
      totalPrice = initialHours * vehicleType.hour1;
    } else if (initialHours <= 6) {
      totalPrice = initialHours * vehicleType.hour6;
    } else if (initialHours <= 11) {
      totalPrice = initialHours * vehicleType.hour11;
    } else if (initialHours <= 16) {
      totalPrice = initialHours * vehicleType.hour16;
    } else if (initialHours <= 24) {
      totalPrice = initialHours * vehicleType.day1;
    } else if (initialHours <= 48) {
      totalPrice = initialHours * vehicleType.day2;
    } else if (initialHours <= 72) {
      totalPrice = initialHours * vehicleType.day3;
    }

    if (Date.parse(reservation.expectedReturnTime) < Date.now()) {
      const seconds = Date.now() - Date.parse(reservation.expectedReturnTime);
      const hours = seconds / (60 * 60 * 1000);
      const lateFees = hours * vehicleType.lateFee;
      totalPrice += lateFees;
    }
    
    if (rating !== null && rating !== undefined) {
      const vehicleRating = new Rating({ ...req.body, vehicle: vehicle });
      await vehicleRating.save();
      await Vehicle.findByIdAndUpdate(
        reservation.vehicle._id,
        {rentalLocation: vehicle.rentalLocation},
        { $push: { ratings: vehicleRating } },
        { $set: { availability: true } }
      );
    } else {

      await Vehicle.findByIdAndUpdate(reservation.vehicle._id,
        {rentalLocation: vehicle.rentalLocation},
         {
        $set: { availability: true }
      });
    }

    if (condition !== null && condition !== undefined) {
      await Vehicle.findByIdAndUpdate(reservation.vehicle._id, {
        $set: { condition: condition }
      });
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.reservationId,
      {
        totalPrice: totalPrice.toFixed(2),
        status: "Returned",
        returned: true,
        returnTime: Date.now()
      },
      { new: true }
    )
      .populate("vehicle")
      .populate({
        path: "vehicle.type",
        model: "VehicleType"
      })
      .populate("pickupLocation")
      .populate("returnLocation");
    res.json({ success: true, reservation: updatedReservation });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

module.exports = router;
