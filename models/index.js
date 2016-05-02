var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');
//****************8when we want to remove the logging functionality, uncomment this: 
//var db = new Sequelize('postgres://localhost:5432/wikistack', {
//     logging: false
// });

//page table/model
// title: the page's title
// urlTitle: a url-safe version of the page title, for links
// content: the page content
// date: when the page was authored
// status: if the page is open or closed
var Page= db.define('Page', {
	//The below vs title: Sequelize.String??
	title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
    },
    date: {
        type: Sequelize.DATE,
        isDate: true,
        defaultValue: Sequelize.NOW

    },
    route: {
    	type: Sequelize.VIRTUAL,
    	get: function(){
    		return "/wiki/"+ this.urlTitle; 
    	}
    }
}); 


//user table/model
// name: full name of the user
// email: a unique, identifying email address
var User= db.define('User', {
	 name: {
        type: Sequelize.STRING,
        allowNull: false

    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true
    }
}); 

module.exports = {
  Page: Page,
  User: User
};