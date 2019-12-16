const express = require("express");
const session = require("express-session");
const router = require("./routes/index");
const path = require("path");
const bodyParser = require('body-parser')



require("dotenv").config({ path: "variables.env"});


const app = express();
// settings

// Middlewares

app.use(bodyParser.json());


app.use(
    session({
        secret: process.env.SECRET,
        key: process.env.KEY,
        resave: false,
        saveUninitialized: false
    })
);

// Static Files
app.use(express.static(path.join(__dirname,"./public")));

// Routes
app.use(router())


const host = "0.0.0.0";
const port = process.env.PORT;

// Server listenting 
app.listen(port, host, () => {
    console.log('Node server is running');
});