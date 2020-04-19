const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

connectDB();

const usersRoute = require('./routes/users');
const vehiclesRoute = require('./routes/vehicles');
const rentalLocationsRoute = require('./routes/rentalLocations');
const reservationsRoute = require('./routes/reservations');
const loginRouter=require('./routes/loginRouter');

app.use(bodyParser.json());

app.use('/users', usersRoute)
app.use('/vehicles', vehiclesRoute)
app.use('/rentalLocations', rentalLocationsRoute)
app.use('/reservations', reservationsRoute)
app.use('/login',loginRouter)

app.get('/',(req,res) => {
    res.send('Home');
});

mongoose.set('useCreateIndex', true);


app.listen(3000);