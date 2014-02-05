/**
* Templates
*/
Template.blogArticle.blog = function () {
	return Blog.find({}, {sort: {date: -1}});
}

Handlebars.registerHelper('datetime', function(date, format){
	if (format=="day"){
		return date.getDate()
	}
	if (format=="monthName"){
		var monthNames = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		return monthNames[date.getMonth()]
	}
	if (format == "date"){
		var year = date.getFullYear()
		var month = ("0" + (date.getMonth()+1)).slice(-2)
		var day = ("0" + date.getDate()).slice(-2)
		return year+'-'+month+'-'+day;
	}
})

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
				addedBy: addedBy,
			});
			document.getElementById('blogTitleInput').value = '';
			document.getElementById('blogTextInput').value = '';

			title.value='';
			text.value='';
		}
	}
}

Template.updateBlog.events = {
	'click input.updateBlog' : function(){
		id = this._id;
		var newDate = new Date(document.getElementById(id+'_date').value);
		console.log(newDate);
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

			newTitle='';
			newText='';
		}
	}
}

Template.blogArticle.events = {
	'click .deleteBlog' : function() {
		Blog.remove(this._id);
	}
}