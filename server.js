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
    var accountId = process.env.OANDA_ACCOUNTID;
    var token = process.env.OANDA_TOKEN;
    
    //Options for streaming rates
//    var options = 
//        {
//            host: "stream-fxpractice.oanda.com",
//            path: "/v1/prices?accountId=" + accountId + "&instruments=EUR_USD",
//            method: "GET",
//            headers: { "Authorization": "Bearer " + token }
//        
//        };
    
    //Options for one time candlestick rates
    var options = 
        {
            host: "api-fxtrade.oanda.com",
            path: "/v1/candles?instrument=EUR_USD&count=5&granularity=M5",
            method: "GET",
            headers: { "Authorization": "Bearer " + token }
        };
        
    
    
    

    https.request(options, function(res) {
        
        var str = "";
        var price_list = [];
        
        res.on("data", function(chunk) {
 
            str += chunk;
           
        });
        
        res.on("end", function() {

            var price = JSON.parse(str).candles;
            
            for (var i in price) {
                
                var open = price[i].openBid;
                var high = price[i].highBid;
                var low = price[i].lowBid;
                var close = price[i].closeBid;
                
                var display = 
                    {
                        open: open,
                        high: high,
                        low: low,
                        close: close
                    };
                
                price_list.push(display);
                
            } //End for statement
            
            
            response.render("index", { candles: price_list });
            
            
        });
        
        
        
        
    
    }).end();
      
        

});







app.listen(port);





