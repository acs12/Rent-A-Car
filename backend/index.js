const express = require('express');
const http = require('http');

const hostname = "localhost";
const port = 3000;

const app = express();

const loginRouter = require('./routes/loginRouter');
app.use('/login', loginRouter);

app.get('/', (req, res) => {
res.send('Hello World')

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});