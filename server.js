var express = require("express");
var app = express();
var https = require("https");


//Get the port for either development or production
var port = process.env.PORT || 3000;

//Serve the static pages and set view engine
app.use("/",express.static(__dirname + "/public"));
app.set("view engine", "ejs");





//Serve response for home page hits
app.get("/", function(request, response) {
    
    
    //Set up HTTPS request to Oanda's API
    
    var options = 
        {
            host: "stream-fxpractice.oanda.com",
            path: "/v1/prices?accountId=" + process.env.OANDA_ACCOUNTID + "&instruments=EUR_USD",
            method: "GET",
            headers: { "Authorization": "Bearer " + process.env.OANDA_TOKEN }
        
        };
        
    

    https.request(options, function(res) {
        
        //console.log(res);
        
        var str = "";
        
        res.on("data", function(chunk) {
 
            var price = JSON.parse(chunk.toString());
            console.log(price);
        });
        
        res.on("end", function() {

            console.log(str);
        });
        
        
    
    }).end();
      
        
    


    
    
    
    console.log("Got request");
    response.render("index");
    
});







app.listen(port);





