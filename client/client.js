/********** CLIENT ***********/
/**
* Templates
*/
Deps.autorun(function(){
	Meteor.subscribe("blog", Session.get('limit'));
});

Template.blog.helpers({
	blog: function(){
		return Blog.find({}, {sort: {date: -1}});
	}
});
Template.projects.helpers({
	project: function(){
		return Projects.find({},{sort: {date: -1}});
	}
});

//helpers
UI.registerHelper('datetime', function(date, format){
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
			addedBy = Meteor.user();
		}
		else{
			addedBy = "Anonymous";
		}

		if (title.value != '' && text.value != ''){
			Blog.insert({
				creationDate: date,
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
		var updated = new Date();
		var newDate = new Date(document.getElementById(id+'_date').value);
		var newTitle = document.getElementById(id+'_title').value;
		var newText = document.getElementById(id+'_text').value;

		if (newTitle.value != '' && newText.value != ''){
			Blog.update({_id: id},
				{$set:{
					lastUpdated: updated,
					date: newDate,
					title: newTitle,
					blogText: newText,
				}}
			);
		}
	},
	
};

Template.blogArticle.events = {
	'click .togglePublishBlog' : function() {
		id = this._id;
		if (this.published === 'yes'){
			var published = 'no';
		}
		else{var published = 'yes';}
		Blog.update({_id: id},
			{$set:{
				published: published,
			}}
		);
		return false;
	},
	'click i.deleteBlogForever' : function(){
		var r=confirm("Are you sure you want to delete forever?");
		if (r==true)
		{
			Blog.remove(this._id);
		}
		return false;
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
		var screenshotsLis = $('.add-screenshot');

		if (live_website.value === ""){
			var hasLive = 'no';
		}else{
			var hasLive="";
		}
		
		var addedBy;
		if (Meteor.user()){
			addedBy = Meteor.user();
		}
		else{
			addedBy = "Anonymous";
		}

		var skillsString = skills.value;
		if (skillsString != ""){
			var skillArray = $.map(skillsString.split(','), $.trim);
		}else{
			var skillArray = [];
		}

		var screenshots = [];
		screenshotsLis.each(function(index){
			var src = $(this).find('.ss-src').val();
			var title = $(this).find('.ss-title').val();
			var caption = $(this).find('.ss-caption').val();
			if (src != "" || caption != ""){
				screenshots.push({src: src, title: title, caption: caption});
			}
		});


		if (title.value != ''){
			Projects.insert({
				creationDate: date,
				date: date,
				title: title.value,
				description: description.value,
				skills: skillArray,
				live_website: live_website.value,
				hasLive: hasLive,
				screenshots: screenshots,
				published: false,
				addedBy: addedBy,
			});

			//clear the form
			title.value = '';
			description.value = '';
			skills.value='';
			live_website.value='';
			screenshotsLis.find('input').val("");

			
		}
	}
};

Template.updateProject.events = {
	'click input#updateProject' : function () {
		id = this._id;
		var title = document.getElementById(id+'_projectTitleInput');
		var description = document.getElementById(id+'_projectDescInput');
		var skills = document.getElementById(id+'_projectSkillsInput');
		var live_website = document.getElementById(id+'_projectWebsiteInput');
		var updated = new Date();

		if (live_website.value === ""){
			var hasLive = 'no';
		}else{
			var hasLive="";
		}

		var skillsString = skills.value;
		if (skillsString != ""){
			var skillArray = $.map(skillsString.split(','), $.trim);
		}else{
			var skillArray = [];
		}

		var screenshots = [];
		$('.update-screenshot-'+ id +' .update-screenshot').each(function(index){
			var src = $(this).find('.ss-src').val();
			var title = $(this).find('.ss-title').val();
			var caption = $(this).find('.ss-caption').val();
			if (src != "" || caption != ""){
				screenshots.push({src: src, title: title, caption: caption});
			}
		});

		if (title.value != ''){
			Projects.update({_id: id},
				{$set:{
					lastUpdated: updated,
					title: title.value,
					description: description.value,
					skills: skillArray,
					live_website: live_website.value,
					hasLive: hasLive,
					screenshots: screenshots
				}}
			);
		}
	}
};

Template.projectArticle.events = {
	'click .togglePublishProject' : function() {
		id = this._id;
		if (this.published === 'yes'){
			var published = 'no';
		}
		else{var published = 'yes';}
		Projects.update({_id: id},
			{$set:{
				published: published,
			}}
		);
	},
	'click i.deleteProjectForever' : function(){
		var r=confirm("Are you sure you want to delete forever?");
		if (r==true)
		{
			Projects.remove(this._id);
		}
	}
};