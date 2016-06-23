var express = require("express");
var app = express();


//Get the port for either development or production
var port = process.env.PORT || 3000;

//Serve the static pages and set view engine
app.use("/",express.static(__dirname + "/public"));
app.set("view engine", "ejs");





//Serve response for home page hits
app.get("/", function(request, response) {
    
    
    console.log("Got request");
    response.render("index");
    
});







app.listen(port);





