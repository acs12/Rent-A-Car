const mongoose = require('mongoose');
const User = require('./User')
const Vehicle = require('./Vehicle')

const Schema = mongoose.Schema
const reservationSchema = new Schema({
     
     user_id:{type: Schema.Types.ObjectId, ref: 'User', required: true },
     vehicle_id: {type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
     pickupLocation:{type: String, required: true},
     returnLocation:{type: String, required: true},
     pickupTime:{ type: Date, required: true}, 
     returnTime:{ type: Date, required: true},
     lengthOfRental:{ type: Number, required: true}
     
});

module.exports = mongoose.model('Reservation',reservationSchema);
