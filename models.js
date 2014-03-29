/********** SERVER ***********/
/**
* Models
*/
Blog = new Meteor.Collection('blog');
Projects = new Meteor.Collection('projects');

//publish collections to client
//If user is signed in get all articles
//If user not signed in only get published articles
Meteor.publish('blog', function(limit) {
	var dl = limit || 5;
	if (this.userId){
		return Blog.find({}, {sort: {date: -1}, limit: dl});
	}
	else{
		return Blog.find({published : 'yes'},{sort: {date: -1}, limit: dl});
	}
});
Meteor.publish(null, function() {
	if (this.userId)
	{
		return Projects.find();
	}
	else{
		return Projects.find({published : 'yes'});
	}
});

//security
//Don't allow people to create accounts
Accounts.config({
	forbidClientAccountCreation: true,
})
//If I don't already have an account, create one for me
var userExists = Meteor.users.findOne({emails: {$elemMatch: {address: "jenberrymail@gmail.com"}}})
if (!userExists){
	console.log('creating admin user jenberymail@gmail.com, Remember to change your password');
	Accounts.createUser({
		username: "Jen Berry",
		email: "jenberrymail@gmail.com",
		password: "changeme",
	})
}
//Allow changes to the database when I'm signed in
Blog.allow({
	'insert': function(userId) {
		if (userId){return true;}
		else{return false;}
	},
	'update': function(userId) {
		if (userId){return true;}
		else{return false;}
	},
	'remove': function(userId) {
		if (userId){return true;}
		else{return false;}
	}
});
Projects.allow({
	'insert': function(userId) {
		if (userId){return true;}
		else {return false;}
	},
	'update': function(userId) {
		if (userId){return true;}
		else {return false;}
	},
	'remove': function(userId) {
		if(userId) {return true;}
		else{return false;}
	}
});
