const mongoose = require('mongoose');
const Vehicle = require('./Vehicle')

const Schema = mongoose.Schema 
const rentalLocationSchema =  new Schema({
 
     name:{ type: String, required: true},
     address:{ type: String, required: true, unique:true}, 
     capacity:{ type: Number, required: true},
     numOfVehicles:{ type: Number, required: true},
     vehicles:[{ type: Schema.Types.ObjectId, ref: 'Vehicle'}]

   
});

module.exports = mongoose.model('Rental Location',rentalLocationSchema);
