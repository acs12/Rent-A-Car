const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const usersRoute = require('./routes/users');
const vehiclesRoute = require('./routes/vehicles');
const rentalLocationsRoute = require('./routes/rentalLocations');
const reservationsRoute = require('./routes/reservations');

mongoose.connect('mongodb+srv://brian80433:<asdzxc0603>@cmpe202-mymln.gcp.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true },() => console.log('Connected to DB!'));


app.use(bodyParser.json());
app.use('/users',usersRoute)
app.use('/vehicles',vehiclesRoute)
app.use('/rentalLocations',rentalLocationsRoute)
app.use('/reservations',reservationsRoute)

app.get('/',(req,res) => {
    res.send('Home');
});

mongoose.set('useCreateIndex', true);


app.listen(3000);