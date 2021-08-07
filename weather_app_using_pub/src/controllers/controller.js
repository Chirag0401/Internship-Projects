const axios = require('axios');
const API_KEY ='fbf1d0422bfaa7d925a3265a8caec9e1';
const Weather = require("../model/weather");


exports.renderHomePage = (req,res)=>{
    res.render("index")
}

exports.getWeather= (req, res)=>{
    
    const city = req.body.city;
    
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const weather= new Weather(req.body.city)
    weather.validateUserInput()

    if (weather.errors.length){
        res.render("index",{
            error:weather.errors.toString()
        })
    } else {
        axios.get(url).then((response)=>{

            const {temp:temperature} = response.data.main
            const {name:location}    = response.data

            res.render("index",{
                weather:`It is currently ${temperature}°C in ${location}`
            })
            console.log(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    
}

exports.renderAboutPage = (req,res)=>{
    res.render("about")
}