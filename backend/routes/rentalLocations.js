const express = require("express");
const router = express.Router();
const RentalLocation = require("../models/RentalLocation");
const Vehicles = require("../models/Vehicle");
const paginated = 20
//get all user
router.get("/", async (req, res) => {
  const { searchText, pageNum } = req.query;
  const skipCount = pageNum * paginated;
  try {
    if (searchText) {
      const locations = await RentalLocation.find({ "name": { $regex: searchText, $options: 'i' } }).skip(skipCount).limit(paginated);          
      const total = await RentalLocation.find({ "name": { $regex: searchText, $options: 'i' } }).countDocuments();
      res.send({total : total, locations : locations});
    } else {
      const locations = await RentalLocation.find().skip(skipCount).limit(paginated);          
      const total = await RentalLocation.countDocuments();
      res.send({total : total, locations : locations});
    }
  } catch (err) {
    res.json({ message: err });
  }
});

//create a user
router.post("/", async (req, res) => {
  console.log("req",req)
  const rentalLocation = new RentalLocation({
    name: req.body.name,
    address: req.body.address,
    capacity: req.body.capacity,
    numOfVehicles : 0
  });
  await rentalLocation.save()
    .then(result => {
      RentalLocation.find()
        .exec()
        .then(result => {
          console.log("inside result",result)
          res.send(result);
        })
    })
    .catch(err => {
      res.send(err)
    })
}
);

//get a specific user
router.get("/:rentalLocationId", async (req, res) => {
  try {
    const rentalLocationVehicles = await Vehicles.find({rentalLocation : req.params.rentalLocationId}).populate("type").populate("rentalLocation");
  return res.send({ total: rentalLocationVehicles.length, vehicles: rentalLocationVehicles });
  } catch (err) {
    res.json({ message: err });
  }
});

//delete a user
router.post("/delete", async (req, res) => {
  try {
    await RentalLocation.remove({
      _id: req.body._id
    })
      .exec()
      .then(result => {
        RentalLocation.find()
          .exec()
          .then(result => {
            res.send(result);
          })
      })
  } catch (err) {
    res.json({ message: err });
  }
});

//update a user
router.post("/update", async (req, res) => {
  console.log("req", req.body)
  await RentalLocation.updateOne(
    { _id: req.body._id },
    {
      $set: {
        name: req.body.name,
        address: req.body.address,
        capacity: req.body.capacity,
        numOfVehicles: req.body.numOfVehicles
      }
    }
  )
    .exec()
    .then(result => {
      RentalLocation.find()
        .exec()
        .then(result => {
          res.send(result);
        })
    })

});

//get Location Names
router.get('/allLocations/IDs', async (req, res) => {
  RentalLocation.find().select("name")
    .exec()
    .then(result => {
      console.log(result)
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
});

module.exports = router;
