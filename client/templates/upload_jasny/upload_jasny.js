Template.upload_jasny.events({
	"change .file-upload-input": function(event, template){
	   var func = this;
	   var file = event.currentTarget.files[0];
	   var reader = new FileReader();
	   reader.onload = function(fileLoadEvent) {
	   	console.log(file);
	    Meteor.call('file-upload', file.name, file.type, reader.result, Meteor.user().username);
	   };
	   reader.readAsBinaryString(file);
	}
});