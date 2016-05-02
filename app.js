var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var bodyParser = require('body-parser');
var swig= require('swig'); 

//var routes= require('./routes/index.js');

//What exactly do these two methods do: 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/',function(request, response){
	console.log(request.path+' '+request.method);
	response.send("hello");
});

//Make sure we file help ticket for this: 
app.use(express.static('public'));

//Make sure to clear this up: 
// app.set('views', __dirname + '/views');
// app.set('view engine', 'html'); 
// app.engine('html', swig.renderFile);
// swig.setDefaults({ cache: false });

app.listen(3000, function(){
	console.log("Server is listening");
});