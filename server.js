var express = require("express");
var app = express();


//Get the port for either development or production
var port = process.env.PORT || 3000;

//Serve the static pages
app.use("/",express.static(__dirname + "/public"));



app.get("/", function(request, response) {
    
    
    console.log("Got request");
    response.send("Hello World");
    
});



app.listen(port);
