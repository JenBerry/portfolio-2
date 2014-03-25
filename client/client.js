/********** CLIENT ***********/
/**
* Templates
*/

Template.blog.blog = function () {
	return Blog.find({}, {sort: {date: -1}});
};
Template.projects.project = function() {
	return Projects.find({},{sort: {date: -1}});
};

//helpers
Handlebars.registerHelper('datetime', function(date, format){
	if (format=="day"){
		return date.getDate();
	}
	if (format=="monthName"){
		var monthNames = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		return monthNames[date.getMonth()];
	}
	if (format == "date"){
		var year = date.getFullYear();
		var month = ("0" + (date.getMonth()+1)).slice(-2);
		var day = ("0" + date.getDate()).slice(-2);
		return year+'-'+month+'-'+day;
	}
});

//blog
Template.addBlog.events = {
	'click input#submitBlog' : function () {
		
		var date = new Date();
		var title = document.getElementById('blogTitleInput');
		var text = document.getElementById('blogTextInput');
		var addedBy;
		if (Meteor.user()){
			addedBy = Meteor.user().profile.name;
		}
		else{
			addedBy = "Anonymous";
		}

		if (title.value != '' && text.value != ''){
			Blog.insert({
				date: date,
				title: title.value,
				blogText: text.value,
				published: false,
				addedBy: addedBy,
			});

			//clear the form
			document.getElementById('blogTitleInput').value = '';
			document.getElementById('blogTextInput').value = '';
		}
	}
};

Template.updateBlog.events = {
	'click input.updateBlog' : function(){
		id = this._id;
		var newDate = new Date(document.getElementById(id+'_date').value);
		var newTitle = document.getElementById(id+'_title').value;
		var newText = document.getElementById(id+'_text').value;

		if (newTitle.value != '' && newText.value != ''){
			Blog.update({_id: id},
				{$set:{
					date: newDate,
					title: newTitle,
					blogText: newText,
				}}
			);
		}
	},
	'click input.deleteForever' : function(){
		var r=confirm("Are you sure you want to delete forever?");
		if (r==true)
		{
			Blog.remove(this._id);
		}
	}
};

Template.blogArticle.events = {
	'click .deleteBlog' : function() {
		id = this._id;
		published = !this.published;
		Blog.update({_id: id},
			{$set:{
				published: published,
			}}
		);
	}
};

//Projects
Template.addProject.events = {
	'click input#submitProject' : function () {
		
		var date = new Date();
		var title = document.getElementById('projectTitleInput');
		var description = document.getElementById('projectDescInput');
		var skills = document.getElementById('projectSkillsInput');
		var live_website = document.getElementById('projectWebsiteInput');
		var details = document.getElementById('projectDetailsInput');
		var addedBy;
		if (Meteor.user()){
			addedBy = Meteor.user().profile.name;
		}
		else{
			addedBy = "Anonymous";
		}

		if (title.value != ''){
			Projects.insert({
				date: date,
				title: title.value,
				description: description.value,
				skills: skills.value,
				live_website: live_website.value,
				details: details.value,
				published: false,
				addedBy: addedBy,
			});

			//clear the form
			document.getElementById('blogTitleInput').value = '';
			document.getElementById('projectDescInput').value = '';
			document.getElementById('projectSkillsInput').value='';
			document.getElementById('projectWebsiteInput').value='';
			document.getElementById('projectDetailsInput').value='';
		}
	}
};

Template.updateProject.events = {
	'click input#updateProject' : function () {
		console.log('update clicked');
		id = this._id;
		var title = document.getElementById(id+'_projectTitleInput');
		var description = document.getElementById(id+'_projectDescInput');
		var skills = document.getElementById(id+'_projectSkillsInput');
		var live_website = document.getElementById(id+'_projectWebsiteInput');
		var details = document.getElementById(id+'_projectDetailsInput');
		console.log('title ' + title.value);
		if (title.value != ''){
			console.log('performing update');
			Projects.update({_id: id},
				{$set:{
					title: title.value,
					description: description.value,
					skills: skills.value,
					live_website: live_website.value,
					details: details.value,
				}}
			);
		}
	}
};

Template.projectArticle.events = {
	'click .deleteProject' : function() {
		id = this._id;
		published = !this.published;
		Projects.update({_id: id},
			{$set:{
				published: published,
			}}
		);
	},
	'click input.deleteForever' : function(){
		var r=confirm("Are you sure you want to delete forever?");
		if (r==true)
		{
			Projects.remove(this._id);
		}
	}
};