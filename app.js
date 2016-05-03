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
console.log();
	//response.send("hello");
	next(); 
});
app.use('/wiki', wikiRouter);

//****************2)Make sure we file help ticket for this: 
app.use(express.static(__dirname +'public'));
// app.use('public/stylesheets/');

//****************3)Make sure to clear this up: 
//when you go to res.render, find the file here: 
app.set('views', __dirname + '/views');
//when you go to res.redner, the extension will be, 
app.set('view engine', 'html'); 
//when you go to res.render html, utilize swig.renderFile to do so
app.engine('html', swig.renderFile);
//try not to clash with express caching 
swig.setDefaults({ cache: false });

// app.listen(3000, function(){
// 	console.log("Server is listening");
// });

//****************4)this is returning a promise right ??
models.User.sync()
.then(function () {
	//*********5) What exactly does force:true do? 
    return models.Page.sync()
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);

//Answers to the above questions: 

//  ****************1) What exactly do these two methods do: 
//when we submit a form we get url parameters from the contents of that form, in order to make use of the parameters in the url we need
// body-parser.urlencoded to turn it into an accesible js object : app.use(bodyParser.urlencoded({ extended: false }));

//If form some reason, a request made from a client comes in json form then we need to app.use(bodyParser.json()), in order to have access to it 
//in req.body. 

//****************2)Make sure we file help ticket for this: 
//Instead of having to make a router and method that handles a request for a file, we can use app.use(express.static(public)) that will server files for us from the public folder according to which css file 
//the link element is sending get request for (the value of href in that link element)


//****************3)Make sure to clear this up: 


//**************how can we connect this to regular SQL tables conceptually? 
// Page.belongsTo(User, { as: "author" }); -----this creates an authorId column how come? 	



