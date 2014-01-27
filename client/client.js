/**
* Templates
*/
Template.project.projects = function  () {
	return Projects.find({}, {sort: {time: -1}});
}

Template.addProject.events = {
	'keydown input#project' : function (event) {
		if (event.which == 13) { //enter key
			var title = 'New Project';
			var addedBy
			if (Meteor.user()){
				addedBy = Meteor.user().profile.name;
			}
			else{
				addedBy = "Anonymous"
			}
			var description = document.getElementById('project')

			if (description.value != '') {
				Projects.insert({
					title: title,
					description: description.value,
					addedBy: addedBy,
					time: Date.now(),
				});

				document.getElementById('project').value = '';
				description.value = '';
			}
		}
	}
}