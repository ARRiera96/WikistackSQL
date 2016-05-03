var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User;

module.exports = router;

//this method will display all of the pages in the database
router.get('/', function(req, res){
  //res.redirect('/');
  console.log("home page router");
  Page.findAll().then(function(pages){
  	res.render("index", {pages: pages});
  });
  
});

//this method will create a user in the database
router.post('/', function(req,res){
	//it converts its parameter to json and then sends that json object as response 
	//var urlTitle= req.body.title; 
  console.log('body', req.body);
	var title= req.body.title; 
	var content= req.body.content; 
  	var status= req.body.status; 
 // res.send('got to POST /wiki/');
// STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
    var user = User.build({
    	name: req.body.author,
    	email: req.body.email
  	});
  	user.save()
  	.then(function(user){
    	var page = Page.build({
    	title: title,
   	 	content: content,
    	status: status,
    	 authorId: user.id
  	})
    .save()
    .then(function(page){
    	res.redirect(page.route); 
  });;
  });

});


router.get('/add', function(req,res){
	res.render('addpage'); 
 // res.send('got to GET /wiki/add');
});

//A colon in the route within the method,signals express to turn into a variable and put it into req.params. 
router.get('/:urlTitle', function (req, res, next) {
  //res.send('hit dynamic route at ' + req.params.urlTitle);
   Page.findOne({ 
    where: { 
      urlTitle: req.params.urlTitle 
    } 
  })
  .then(function(page){

     res.render( 'wikipage', { title: page.title , content: page.content } );
//,     
  })
  .catch(next);

});




