const express = require("express");
const router = express.Router();
const RentalLocation = require("../models/RentalLocation");

//get all user
router.get("/", async (req, res) => {
  const { searchText } = req.query;
  try {
    if (searchText) {
      await RentalLocation.find({ "name": { $regex: searchText, $options: 'i' } })
        .exec()
        .then(result => {
          res.send(result);
        })

    } else {
      await RentalLocation.find()
        .exec()
        .then(result => {
          res.send(result);
        })
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
    const rentalLocation = await RentalLocation.findById(
      req.params.rentalLocationId
    ).populate('vehicles');
    res.json(rentalLocation);
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
