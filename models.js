/********** SERVER ***********/
/**
* Models
*/
Blog = new Meteor.Collection('blog');
Projects = new Meteor.Collection('projects');

//publish collections to client
//If user is signed in get all articles
//If user not signed in only get published articles
Meteor.publish(null, function() {
	if (this.userId){
		return Blog.find();
	}
	else{
		return Blog.find({published : true});
	}
});
Meteor.publish(null, function() {
	if (this.userId)
	{
		return Projects.find();
	}
	else{
		return Projects.find({published : true});
	}
});

//security
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