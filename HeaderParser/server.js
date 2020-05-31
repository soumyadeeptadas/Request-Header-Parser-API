// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

var useragent=require('express-useragent');
app.use(useragent.express());


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


let api= '/api/whoami';

app.get(api, function(req,res){
  let ipaddress= req.ip;
  let languages= req.acceptsLanguages();
  let sysInfo= req.useragent.source;
  res.json({'ipaddress': ipaddress, 'language': languages, 'software': sysInfo});
})





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log(`Your app is listening on: localhost:${listener.address().port}`);
});
