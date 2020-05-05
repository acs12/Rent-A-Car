const express = require("express");
const router = express.Router();

const hardCount = 20;
const Vehicle = require("../models/Vehicle");
const RentalLocation = require("../models/RentalLocation");

//get all vehicles
router.get("/", async (req, res) => {
  try {
    const { pageNum, searchText } = req.query;
    const skipCount = hardCount * pageNum;
    if (searchText) {
      const vehicles = await Vehicle.find()
        .or([{ carname: { $regex: searchText } }])
        .skip(skipCount)
        .limit(hardCount)
        .populate("type")
        .populate("rentalLocation").populate({ 
          path: 'rentalLocation',
          populate: {
            path: 'address',
            model: 'Address'
          } 
       });
      const total = await Vehicle.countDocuments();
      return res.send({ total: total, vehicles: vehicles });
    } else {
      const vehicles = await Vehicle.find()
        .skip(skipCount)
        .limit(hardCount)
        .populate("type")
        .populate("rentalLocation").populate({ 
          path: 'rentalLocation',
          populate: {
            path: 'address',
            model: 'Address'
          } 
       });
      const total = await Vehicle.countDocuments();
      return res.send({ total: total, vehicles: vehicles });
    }
  } catch (error) {
    res.send(error);
  }
});

//create a user
router.post("/", async (req, res) => {
  
  v = new Vehicle({
    carname: req.body.carname,
    type: req.body.type,
    make: req.body.make,
    modelYear: req.body.modelYear,
    currentMileage: req.body.currentMileage,
    condition: req.body.condition,
    timeLastServiced: req.body.timeLastServiced,
    availability: true,
    rentalLocation: req.body.rentalLocation
  });

  r = await RentalLocation.findById(req.body.rentalLocation);

  if (r.numOfVehicles < r.capacity ) {
    v.save()
      .then(result => {
        Vehicle.find()
          .exec()
          .then( async (result) => {
            await RentalLocation.findByIdAndUpdate(
              req.body.rentalLocation,
              { $inc: { numOfVehicles: 1 } }
            );
            return res.send({ success: true, vehicles: result });
          });
      })
      .catch(err => {
        return res.send(err);
      });
  } else {
    res.json({
      message:
        "The park of this rental location is full now, please add to another location"
    });
  }
});

//get a specific user
router.get("/:vehicleId", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.vehicleId)
      .populate("rentalLocation")
      .populate("type");
    res.json(vehicle);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete a user
router.post("/delete", async (req, res) => {
  try {
    Vehicle.remove({ _id: req.body._id })
      .exec()
      .then(result => {
        Vehicle.find()
          .exec()
          .then(result => {
            res.send(result);
          });
      });
  } catch (err) {
    res.json({ message: err });
  }
});

//update a user
router.post("/update", async (req, res) => {
  console.log("vehicle update api", req.body);
  if (req.body.rentalLocation && req.body.type) {
    try {
      Vehicle.updateOne(
        { _id: req.body._id },
        {
          $set: {
            carname: req.body.carname,
            type: req.body.type,
            make: req.body.make,
            modelYear: req.body.modelYear,
            currentMileage: req.body.currentMileage,
            condition: req.body.condition,
            timeLastServiced: req.body.timeLastServiced,
            rentalLocation: req.body.rentalLocation
          }
        }
      )
        .exec()
        .then(result => {
          Vehicle.find()
            .populate("rentalLocation")
            .populate("type")
            .exec()
            .then(result => {
              res.send(result);
            });
        });
    } catch (err) {
      req.json({ message: err });
    }
  } else if (req.body.rentalLocation) {
    try {
      Vehicle.updateOne(
        { _id: req.body._id },
        {
          $set: {
            carname: req.body.carname,
            make: req.body.make,
            modelYear: req.body.modelYear,
            currentMileage: req.body.currentMileage,
            condition: req.body.condition,
            timeLastServiced: req.body.timeLastServiced,
            rentalLocation: req.body.rentalLocation
          }
        }
      )
        .exec()
        .then(result => {
          Vehicle.find()
            .populate("rentalLocation")
            .populate("type")
            .exec()
            .then(result => {
              res.send(result);
            });
        });
    } catch (err) {
      req.json({ message: err });
    }
  } else if (req.body.type) {
    try {
      Vehicle.updateOne(
        { _id: req.body._id },
        {
          $set: {
            carname: req.body.carname,
            type: req.body.type,
            make: req.body.make,
            modelYear: req.body.modelYear,
            currentMileage: req.body.currentMileage,
            condition: req.body.condition,
            timeLastServiced: req.body.timeLastServiced
          }
        }
      )
        .exec()
        .then(result => {
          Vehicle.find()
            .populate("rentalLocation")
            .populate("type")
            .exec()
            .then(result => {
              res.send(result);
            });
        });
    } catch (err) {
      req.json({ message: err });
    }
  } else {
    try {
      Vehicle.updateOne(
        { _id: req.body._id },
        {
          $set: {
            carname: req.body.carname,
            make: req.body.make,
            modelYear: req.body.modelYear,
            currentMileage: req.body.currentMileage,
            condition: req.body.condition,
            timeLastServiced: req.body.timeLastServiced
          }
        }
      )
        .exec()
        .then(result => {
          Vehicle.find()
            .populate("rentalLocation")
            .populate("type")
            .exec()
            .then(result => {
              res.send(result);
            });
        });
    } catch (err) {
      req.json({ message: err });
    }
  }
});

//get vehicle Name
router.post("/allVehicles/IDs", async (req, res) => {
  await Vehicle.find({
    rentalLocation: { $ne: req.body.locationId }
  })
    .select("carname")
    .exec()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
