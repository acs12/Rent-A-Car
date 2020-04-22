const express = require("express");
const router = express.Router();
const RentalLocation = require("../models/RentalLocation");

//get all user
router.get("/", async (req, res) => {
  const { searchText } = req.query;
  try {
    if (searchText) {
      const rentalLocations = await RentalLocation.find({ "name" : { $regex: searchText , $options: 'i' } });
      res.json(rentalLocations);
    } else {
      const rentalLocations = await RentalLocation.find();
      res.json(rentalLocations);
    }
  } catch (err) {
    res.json({ message: err });
  }
});

//create a user
router.post("/", async (req, res) => {
  const rentalLocation = new RentalLocation({
    name: req.body.name,
    address: req.body.address,
    capacity: req.body.capacity,
    numOfVehicles: req.body.numOfVehicles,
    vehicles: req.body.vehicles
  });
  try {
    const savedRentalLocation = await rentalLocation.save();
    res.json(savedRentalLocation);
  } catch (err) {
    res.json({ message: err });
  }
});

//get a specific user
router.get("/:rentalLocationId", async (req, res) => {
  try {
    const rentalLocation = await RentalLocation.findById(
      req.params.rentalLocationId
    ).populate('vehicles');
    res.json(rentalLocation);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete a user
router.delete("/:rentalLocationId", async (req, res) => {
  try {
    const removedRentalLocation = await RentalLocation.remove({
      _id: req.params.rentalLocationId
    });
    res.json(removedRentalLocation);
  } catch (err) {
    res.json({ message: err });
  }
});

//update a user
router.patch("/:rentalLocationId", async (req, res) => {
  try {
    const updatedRentalLocation = await RentalLocation.updateOne(
      { _id: req.params.rentalLocationId },
      {
        $set: {
          vehicles: req.body.vehicles,
          numOfVehicles: req.body.numOfVehicles
        }
      }
    );
    res.json(updatedRentalLocation);
  } catch (err) {
    req.json({ message: err });
  }
});

module.exports = router;
