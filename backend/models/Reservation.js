const mongoose = require('mongoose');
const User = require('./User')
const Vehicle = require('./Vehicle')

const Schema = mongoose.Schema
const reservationSchema = new Schema({
     
     user:{type: Schema.Types.ObjectId, ref: 'User', required: true },
     vehicle: {type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
     pickupLocation:{type:Schema.Types.ObjectId, ref:'RentalLocation', required: true},
     returnLocation:{type: Schema.Types.ObjectId, ref:'RentalLocation', required: true},
     pickupTime:{ type: Number, required: true}, 
     returnTime:{ type: Number},
     status : {type : String},
     totalPrice : {type : Number, default : 0},
     expectedReturnTime:{ type: Number, required: true},
     returned:{ type: Boolean, required:true, default : false}
     
     
});

module.exports = mongoose.model('Reservation',reservationSchema);
