const mongoose = require('mongoose');
const Schema = mongoose.Schema 
const ratingSchema =  new Schema({

     rating:{ type: Number, required: true},
     comment:{ type: String}
});

module.exports = mongoose.model('Rating',ratingSchema);
