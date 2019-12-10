const express = require("express");
const router = require("./routes/index");
const path = require("path");
const bodyParser = require('body-parser')
const morgan = require("morgan");
const cors = require("cors");



const app = express();
// settings

// Middlewares

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// Static Files
app.use(express.static(path.join(__dirname,"./public")));

// Routes
app.use(router())

// Server listenting 
var server = app.listen(9888, function () {
    console.log('Node server is running on port 9888..');
});