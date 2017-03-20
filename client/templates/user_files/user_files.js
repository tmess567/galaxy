Template.user_files.events({
	"click #show_files": function(event, template){
	   Meteor.call('file-list', Meteor.user().username, function(error, result){
	   	$("#file-list").html(result.replace(/\n/g, "<br />"));
	   });
	}
});