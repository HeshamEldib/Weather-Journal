// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies*/
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 5000;

app.listen(port, () => {
    console.log(`running on localhost:${port}`);
});

// get data
app.get("/allData", (req, res) => {
    res.send(projectData);
    console.log(res.send(projectData));
});

// post data
app.post("/postData", (req, res) => {
    console.log(req.body);
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content,
    };
    console.log(projectData);
    res.send(projectData);
});