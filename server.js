// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
})

function validMonth(a, b){
  
  var found = false;
  
  for(var x = 0; x < b.length; x++){
    if(a.toUpperCase().search(b[x].toUpperCase()) != -1)
      found = true;
  }
  
  return found;
};

app.get("/:date", function (req, res) {
  
    var timestamp = req.params.date;
    var TSSplit = timestamp.split(' ');
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  
  if(TSSplit.length === 1 && /^\d+$/.test(timestamp)){
      
        var a = new Date(timestamp * 1000);
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var natural =  month + ' ' + date + ', ' + year;
        res.json({natural: natural, unix: timestamp});
      
  }else if(
      
        TSSplit.length === 3 &&
        validMonth(TSSplit[0], months) &&
        TSSplit[1].slice(0,2).length == 2 &&
        TSSplit[1].slice(0,2) > 0 &&
        TSSplit[1].slice(0,2) < 32 && 
        TSSplit[2].length == 4 &&
        TSSplit[2] > 0){
      
          var unix = new Date(timestamp).getTime() / 1000;  
          res.json({natural: timestamp, unix: unix});
    }else{
        
        res.json({natural: null, unix: null});
    }
  
  res.end();
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
