const express = require("express");
const session = require("express-session");
const router = require("./routes/index");
const path = require("path");
const bodyParser = require('body-parser')
const morgan = require("morgan");


require("dotenv").config({ path: "variables.env"});


const app = express();
// settings

// Middlewares

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(
    session({
        secret: SECRET,
        key: KEY,
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
app.listen(host, port, () => {
    console.log('Node server is running');
});