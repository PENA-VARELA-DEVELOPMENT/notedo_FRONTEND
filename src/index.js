const express = require("express");
const router = require("./routes/index");
const path = require("path");

const app = express();

// settings

// Middlewares

// Routes
app.use(require)
// Static Files

app.use(express.static(path.join(__dirname,"./public")));


// Server listenting 
var server = app.listen(9888, function () {
    console.log('Node server is running..');
});