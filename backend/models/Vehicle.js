const mongoose = require('mongoose');


const Schema = mongoose.Schema
const vehicleSchema = new Schema({

     type: { type: String, required: true},
     price: { type: Number, required: true}, // price varies in different sessions
     make: { type: String, required: true},
     modelYear: { type: Number, required: true},
     currentMileage: { type: Number, required: true},
     condition: { type: String, required: true},
     timeLastServiced:{ type: Date}
});

module.exports = mongoose.model('Vehicle',vehicleSchema);
