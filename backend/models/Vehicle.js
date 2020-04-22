const mongoose = require('mongoose');


const Schema = mongoose.Schema
const vehicleSchema = new Schema({
     carname : { type: String, required: true},
     type: { type: Schema.Types.ObjectId, ref: 'VehicleType' },
     make: { type: String, required: true},
     modelYear: { type: Number, required: true},
     currentMileage: { type: Number, required: true},
     condition: { type: String, required: true},
     timeLastServiced:{ type: Date},
     ratings : {type : mongoose.Types.ObjectId, ref : 'Rating'},
     rentalLocation : {type : Schema.Types.ObjectId , ref : "RentalLocation"},
     availability : {type: Boolean, required: true}
});

module.exports = mongoose.model('Vehicle',vehicleSchema);
