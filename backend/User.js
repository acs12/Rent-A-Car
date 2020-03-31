const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({

    username:{ type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: {type:Boolean},
    dlState: { type: String, required: true},
    dlNumber: { type: Number, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    creditCardInfo: { type: Number, required: true},
    residenceAddress:{ type: String, required: true}
});

module.exports = mongoose.model('User',userSchema);

 