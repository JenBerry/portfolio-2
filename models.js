/**
* Models
*/
Blog = new Meteor.Collection('blog');
Projects = new Meteor.Collection('projects');

//publish collections to client
//If user is signed in get all articles
//If user not signed in only get published articles
Meteor.publish('blog', function() {
	if (this.userId){
		return Blog.find();
	}
	else{
		return Blog.find({published : {$nin: [false]}});
	}
});
Meteor.publish('projects', function() {
	if (this.userId)
	{
		return Projects.find();
	}
	else{
		return Projects.find({published : {$nin: [false]}});
	}
});