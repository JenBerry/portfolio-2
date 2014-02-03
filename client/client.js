/**
* Templates
*/
Template.blogArticle.blog = function () {
	return Blog.find({}, {sort: {datetime: -1}});
}

Template.addBlog.events = {
	'click input#submitBlog' : function () {

		var date = new Date();
		var day = date.getDate();
		var monthNames = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		var month = monthNames[date.getMonth()];
		var datetime = date.getFullYear()+'-'+date.getMonth()+'-'+day;
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
				datetime: datetime,
				day: day,
				month: month,
				title: title.value,
				blogText: text.value,
				addedBy: addedBy,
			});
			document.getElementById('blogTitleInput').value = '';
			document.getElementById('blogTextInput').value = '';

			datetime='';
			day='';
			month='';
			title.value='';
			text.value='';
		}
	}
}