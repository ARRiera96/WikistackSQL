var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var bodyParser = require('body-parser');
var swig= require('swig'); 
var models = require('./models');
var wikiRouter = require('./routes/wiki');


//var routes= require('./routes/index.js');

//  ****************1) What exactly do these two methods do: 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/',function(request, response, next){
	console.log(request.path+' '+request.method);

	//response.send("hello");
	next(); 
});
app.use('/wiki', wikiRouter);

//****************2)Make sure we file help ticket for this: 
app.use(express.static('public'));

//****************3)Make sure to clear this up: 
app.set('views', __dirname + '/views');
app.set('view engine', 'html'); 
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });

// app.listen(3000, function(){
// 	console.log("Server is listening");
// });

//****************4)this is returning a promise right ??
models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);