import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
Meteor.startup(function() {
  Uploader.finished = function(index, fileInfo, templateContext) {
  	console.log('client get'+fileInfo.url);
    Meteor.call('encryptIt', fileInfo, Meteor.user().username);
  }
})
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});


if (Meteor.isClient){
	Template.signupForm.events({
		'submit #signup-form':function(e,t) {
			// body...
			e.preventDefault();

			Accounts.createUser({
				username:t.find('#signup-username').value,
				password:t.find('#signup-password').value,
				email:t.find('#signup-email').value,
				profile:{
					fullname:t.find('#signup-name').value
				}	

			},function(err){
				if (error) {
					alert("Account is not created");
				}
			});
		}

});
			Template.logoutForm.events({
				'submit #logout-form':function(e,t){
					e.preventDefault();

					Meteor.logout(function(error){
						if(error)
						{
							alert("Unable to logout from the application");
						}
					})
				}
			});

			Template.loginForm.events({
				'submit #login-form':function(e,t){
					e.preventDefault();

					var unam=t.find("#login-username").value;
					var password=t.find("#login-password").value;

					Meteor.loginWithPassword(unam,password,function(error){
						if(error)
						{
							alert("Wrong Credentials!");
						}
					});
				}
	});
}