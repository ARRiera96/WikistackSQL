var express = require('express');
var router = express.Router();

module.exports = router;

//this method will display all of the pages in the database
router.get('/', function(req, res){
  res.redirect('/');

});

//this method will create a user in the database
router.post('/', function(req,res){
	//it converts its parameter to json and then sends that json object as response 
	res.json(req.body)
 // res.send('got to POST /wiki/');

});
router.get('/add', function(req,res){
	res.render('addpage'); 
 // res.send('got to GET /wiki/add');
});


