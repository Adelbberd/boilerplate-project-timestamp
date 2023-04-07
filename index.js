// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp Microservice project
app.get("/api/:date?", function(req, res) {
  var isValidDate = req.params.date;

  if (/[0-9]{5,}/.test(isValidDate)) {
    const timeStampInt = parseInt(isValidDate);
    res.json({ unix: timeStampInt, utc: new Date(timeStampInt).toUTCString()});
  } else if (!isNaN(Date.parse(isValidDate))) {
    const timeStampInt = Date.parse(isValidDate);
    res.json({unix: timeStampInt, utc: new Date(timeStampInt).toUTCString()});
  } else if (isValidDate == "") {
    const currentDate = new Date();
    res.json({unix: Date.parse(currentDate), utc: currentDate.toUTCString()});
  } else {
    res.json({error: 'Invalid Date'});
  }
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
