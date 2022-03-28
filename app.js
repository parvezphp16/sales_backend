const express = require('express');
const app = express();
const http = require('http')
const cors = require('cors')
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const server = http.createServer(app);
const port = 8000;

app.use(cors()) //enable all apis req and res
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(morgan('dev'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// routes ======================================================================
require('./config/routes.js')(app); // load our routes and pass in our app and fully configured passport
server.listen(port, function() {console.log('Magic happens on port ', port)})

exports = module.exports = app;