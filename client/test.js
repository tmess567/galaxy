
Template.test.onCreated(function() {
 var instance = this;
 instance.subscribe("testData");
});

Template.test.helpers({
 tests: function() {
   return Test.find();
 },
});
Template.test.events({
	"click #show_files": function(event, template){
	   Meteor.call('file-list', Meteor.user().username, function(error, result){
	   	$("#file-list").html("<p>"+result.replace(/\n/g, "</p><p>")+"</p>");
	   });
	   $("#file-list").each(function(index){
	   		$(this).on("click", function(evt){
	   			$("#loading").show();
	   			console.log('upload/'+Meteor.user().username+'/decrypted/'+evt.target.innerText);
	   			//window.location = 'upload/'+Meteor.user().username+'/decrypted/'+evt.target.innerText;
	   			Meteor.call('decryptIt', Meteor.user().username, evt.target.innerText, Meteor.user()._id, function(err){
	   				$("#imageShow").attr('src','upload/'+Meteor.user().username+'/decrypted/'+evt.target.innerText);
	   				
	   				$("#loading").hide();	
	   			});
	   			
	   		})
	   })
	},
	'change input' : function(event,template){ 
	    var file = event.target.files[0]; //assuming 1 file only
	    if (!file) return;

	    var reader = new FileReader(); //create a reader according to HTML5 File API

	    reader.onload = function(event){      
	    console.log(reader);
	    console.log(reader.result);    
	      var buffer = new Uint8Array(reader.result)
	      Meteor.call("encryptIt", buffer, reader.result, file.name, 
	      	Meteor.user().username, Meteor.user()._id, function(err, response){
	      	console.log(err);
	      })
 // convert to binary
	      //Meteor.call('saveFile', buffer);
	      // Test.insert({data: string});
	      // console.log(string);
	    }


   		reader.readAsBinaryString(file);

	    //reader.readAsArrayBuffer(file); //read the file as arraybuffer
	},
	"click #share": function(){
		let filename = $("#fileNameShare").val();
		let username2 = $("#userNameShare").val();
		Meteor.call('shareFile', filename, Meteor.user().username, username2, function(err, response){
			alert("shared");
		});
	}
});
