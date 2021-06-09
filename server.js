function newDate() {
    let d = new Date();
    return d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
}

class WeatherEntry {
    constructor(zipCode, content, temp) {
        this.date = newDate()
        this.zipCode = zipCode
        this.content = content
        this.temp = temp
    }
}

const data = []
const API_KEY = "A81kaskkajd18913asdkkasdd1j31iuja132"

projectData = {
    "message": "data fetched successfully",
    "data": data,
};


// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const fetch = require("node-fetch");

app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening() {
    // console.log(server);
    console.log(`running on http://localhost:${port}\n`);
}


app.get('/api/weather', function (request, response) {
    console.log("get request =>", "\nurl " + request.url, "\nAuth " + request.header("Authorization"))
    console.log('===============================================================================\n')


    const authorization = request.header("Authorization")

    if (authorization !== API_KEY) {
        console.log("Unauthorized request")
        response.status(401)
        response.send()
        return
    }
    response.send(projectData);
});

app.post('/api/weather', async function (request, response) {
    console.log("post request =>", "\nurl " + request.url, "\nbody " + JSON.stringify(request.body), "\nAuth " + request.header("Authorization"))
    console.log('===============================================================================\n')

    const authorization = request.header("Authorization")

    if (authorization !== API_KEY) {
        console.log("Unauthorized request")
        response.status(401)
        response.send()
        return
    }

    const temp = await getTemperature(getWeatherUrl)
    const body = request.body
    const zipCode = body.zipCode
    const content = body.content

    const weatherEntry = new WeatherEntry(zipCode, content, temp)
    data.push(weatherEntry)
    response.send(projectData)
})

const WEATHER_API_KEY = "8f19d38f8fa2a04e30e2e21d60878384"
const cityName = 'cairo'
const getWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`

function getTemperature(url) {
    return fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then(jsonBody => jsonBody.main.temp)
        .then(temp => temp + ' °C')
}

