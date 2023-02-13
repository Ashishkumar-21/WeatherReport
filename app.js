const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")

    // res.send("Server is running");
});


app.post("/",function(req,res){

    var city = req.body.cityName;
    var country = req.body.countryName;
    const unit = "metric";
    const apid = "3bd30950cd3b562eb74bd5e16b8f7f92";
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +","+ country +"&appid="+apid+"&units="+unit;
    https.get(url,function(responce){
        console.log(responce.statusCode);
        responce.on("data",function(data){
            // console.log(data);
            const weatherData = JSON.parse(data);
            console.log(weatherData); 
            const temp = weatherData.main.temp;
            console.log(temp);
            const dis = weatherData.weather[0].description;
            console.log(dis);
            const icona = weatherData.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/"+icona+"@2x.png";
            
            res.write("<h1>The temperature in "+city+" is "+temp+" degree celcius</h1>")
            res.write("<h3>The weather is currently "+dis+"</h3>")
            res.write("<img src="+ imgurl +">");
            res.send();
            // const object={
            //     name:"Ashish",
            //     favfood:"Chicken"
            // }
            // console.log(JSON.stringify(object));
        })
    })




    
})





app.listen(3000,function(){
    console.log("Server is started in port 3000");
});