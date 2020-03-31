const express = require('express');
const bodyParser = require('body-Parser');

const loginRouter = express.Router();

loginRouter.use(bodyParser.json());

loginRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the users');
})
.post((req, res, next) => {
    res.end('Will add the user: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported ');
})
.delete((req, res, next) => {
    res.end('Deleting');
});

module.exports = loginRouter;