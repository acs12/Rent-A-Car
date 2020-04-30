const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({

    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name : {type : String},
    admin: {type:Boolean},
    manager : {type : Boolean},
    dlImage: { type: String },
    creditCardInfo: { type: Number},
    residenceAddress:{ type: String},
    phoneNumber:{type: Number}
});

module.exports = mongoose.model('User',userSchema);

 
