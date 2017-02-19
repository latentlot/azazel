var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/azazel');


var log = mongoose.model('log', 
	{ 
		source: String,
		headers: String,
		location: String
	}
);

var app = express();
var cors = require('cors')

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.get('/logger/', cors(corsOptions), function(req, res) {
	res.send('hello');
});

app.post('/logger/', cors(corsOptions), function (req, res) {
	
  	res.send('Hello World');
  	//console.log(req.body.source + " " + req.body.headers);
  	//console.log(req);
  	//console.log(req.body.source.length + "\n");
  	
  	var logger = new log({ source: req.body.source, headers: req.body.headers, location: req.body.location });
  	
	logger.save(function (err) {
	  if (err) {
	    console.log(err);
	  } else {
	    console.log('meow');
	  }
	});
	
})
 
app.listen(31337);
