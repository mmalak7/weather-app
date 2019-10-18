const express = require('express');
const request = require('request');
const dotenv = require('dotenv');

const app = express();
dotenv.config();


module.exports = (app) => {

    app.post('/search-weather', (req, res) => {
        const API_KEY = process.env.API_KEY;
        const city = req.body;
        const weather_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=imperial&APPID=${API_KEY}`;

        request(weather_URL, (err, response, body) => {
            if (err) {
                res.send('Error');
            } else {
                let cityBody = JSON.parse(body);
                temp = cityBody.main.temp;
                press = cityBody.main.pressure;
                name = cityBody.name;
                id = cityBody.weather[0].id;
                
                res.send({
                    id: id,
                    name: name,
                    temp: temp,
                    press: press,
                });
            }
        })
    })
}